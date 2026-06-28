#!/usr/bin/env bash
#
# Full production deploy for arai-website (run on the server, from the repo root).
#
#   cd ~/arai-website && git pull && ./deploy.sh
#
# It updates the backend (Python venv + deps + DB seed + restart service) and the
# frontend (npm build + copy to the nginx web root + reload nginx).
#
# Requirements already set up once via deploy/server_setup notes:
#   - MySQL running with the arai_lab database + app user
#   - backend/.env present (gitignored) with DATABASE_URL / JWT_SECRET / admin creds
#   - systemd unit `arai-api` installed (see deploy/arai-api.service)
#   - nginx site has the /api/ proxy block (see deploy/nginx-api-location.conf)

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_DIR="/var/www/arai-website"

# Load nvm so node/npm are available in a non-login shell.
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

echo "==> [1/5] Backend: Python venv + dependencies"
cd "$ROOT/backend"
if [ ! -d venv ]; then
  python3 -m venv venv
fi
./venv/bin/pip install --quiet --upgrade pip
./venv/bin/pip install --quiet -r requirements.txt

if [ ! -f .env ]; then
  echo "ERROR: backend/.env is missing. Copy backend/.env.example to backend/.env and fill it in." >&2
  exit 1
fi

echo "==> [2/5] Backend: create tables + seed (idempotent)"
./venv/bin/python seed.py

echo "==> [3/5] Backend: restart API service"
sudo systemctl restart arai-api
sleep 1
sudo systemctl is-active --quiet arai-api && echo "    arai-api is running" || {
  echo "ERROR: arai-api failed to start. Check: sudo journalctl -u arai-api -n 50" >&2
  exit 1
}

echo "==> [4/5] Frontend: install + build"
cd "$ROOT/frontend"
npm install --legacy-peer-deps --no-audit --no-fund
GENERATE_SOURCEMAP=false npm run build
if [ ! -d build ]; then
  echo "ERROR: frontend build folder not found." >&2
  exit 1
fi

echo "==> [5/5] Frontend: publish to ${SITE_DIR} + reload nginx"
sudo rm -rf "${SITE_DIR:?}"
sudo mkdir -p "$SITE_DIR"
sudo cp -r build/* "$SITE_DIR/"
sudo nginx -t
sudo systemctl reload nginx

echo "✅ Deploy complete."
