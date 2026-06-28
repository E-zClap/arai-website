#!/usr/bin/env bash
#
# One-time server bootstrap for the database + API. Idempotent: safe to re-run.
# Run from the repo root on the server:  ./deploy/server_setup.sh
#
# Optional env vars on first run:
#   ADMIN_USERNAME (default: admin)
#   ADMIN_PASSWORD (default: a random string, printed at the end)

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND="$ROOT/backend"
DB_NAME="arai_lab"
DB_USER="arai_app"
SITE_AVAIL="/etc/nginx/sites-available/arai-website"

echo "==> [1/5] Ensure MySQL server is installed and running"
if ! command -v mysql >/dev/null 2>&1; then
  sudo apt-get update -y
  sudo DEBIAN_FRONTEND=noninteractive apt-get install -y mysql-server
fi
sudo systemctl enable --now mysql

echo "==> [2/5] Create database + application user"
if [ -f "$BACKEND/.env" ] && grep -q '^DATABASE_URL=' "$BACKEND/.env"; then
  DB_PASS="$(sed -n 's#^DATABASE_URL=mysql+pymysql://[^:]*:\([^@]*\)@.*#\1#p' "$BACKEND/.env")"
  echo "    reusing DB password from existing backend/.env"
else
  DB_PASS="$(openssl rand -hex 16)"
fi
sudo mysql <<SQL
CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${DB_USER}'@'127.0.0.1' IDENTIFIED BY '${DB_PASS}';
ALTER USER '${DB_USER}'@'127.0.0.1' IDENTIFIED BY '${DB_PASS}';
GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'127.0.0.1';
FLUSH PRIVILEGES;
SQL

echo "==> [3/5] Create backend/.env if missing"
if [ ! -f "$BACKEND/.env" ]; then
  JWT="$(openssl rand -hex 32)"
  ADMIN_USER="${ADMIN_USERNAME:-admin}"
  ADMIN_PASS="${ADMIN_PASSWORD:-$(openssl rand -hex 8)}"
  cat > "$BACKEND/.env" <<ENV
DATABASE_URL=mysql+pymysql://${DB_USER}:${DB_PASS}@127.0.0.1:3306/${DB_NAME}?charset=utf8mb4
JWT_SECRET=${JWT}
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=720
ADMIN_USERNAME=${ADMIN_USER}
ADMIN_PASSWORD=${ADMIN_PASS}
CORS_ORIGINS=*
UPLOAD_DIR=/var/www/arai-uploads
UPLOAD_URL_PREFIX=/uploads
MAX_UPLOAD_MB=8
ENV
  chmod 600 "$BACKEND/.env"
  echo "    created backend/.env"
  echo "    >>> ADMIN LOGIN: username='${ADMIN_USER}'  password='${ADMIN_PASS}'  <<<"
  echo "    (change it from the dashboard after first login)"
else
  echo "    backend/.env already exists - left untouched"
fi

echo "==> [4/6] Install systemd service"
sudo cp "$ROOT/deploy/arai-api.service" /etc/systemd/system/arai-api.service
sudo systemctl daemon-reload
sudo systemctl enable arai-api

echo "==> [5/6] Create persistent uploads directory (survives deploys)"
sudo mkdir -p /var/www/arai-uploads
sudo chown ubuntu:ubuntu /var/www/arai-uploads
sudo chmod 755 /var/www/arai-uploads

echo "==> [6/6] Add nginx /api/ and /uploads/ location blocks (if missing)"
add_nginx_block() {  # $1 = grep marker, $2 = block text
  if [ -f "$SITE_AVAIL" ] && ! sudo grep -q "$1" "$SITE_AVAIL"; then
    sudo python3 - "$SITE_AVAIL" "$2" <<'PY'
import sys
site, block = sys.argv[1], sys.argv[2]
block = "\n".join(("    " + l if l.strip() else l) for l in block.splitlines())
c = open(site).read()
i = c.index("location / {")
open(site, "w").write(c[:i] + block + "\n\n    " + c[i:])
PY
    echo "    inserted: $1"
  else
    echo "    already present (or site missing): $1"
  fi
}

add_nginx_block "location /api/" 'location /api/ {
    proxy_pass http://127.0.0.1:8000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 60s;
}'

add_nginx_block "location /uploads/" 'location /uploads/ {
    alias /var/www/arai-uploads/;
    access_log off;
    expires 30d;
    add_header Cache-Control "public";
}'

[ -f "$SITE_AVAIL" ] && sudo nginx -t

echo
echo "Bootstrap complete. Now run:  ./deploy.sh"
