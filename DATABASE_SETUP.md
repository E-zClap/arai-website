# Database + Admin Dashboard

The site content (News, Publications, Team members) lives in a **MySQL** database
and is managed through a password-protected **admin dashboard** instead of being
hard-coded in the React source.

## Architecture

```
Browser ── HTTPS ──▶ nginx (qig-lab.net)
                     ├── /            → static React build  (/var/www/arai-website)
                     └── /api/*       → FastAPI service     (127.0.0.1:8000, systemd: arai-api)
                                            │
                                            └──▶ MySQL (arai_lab)
```

- The public pages fetch `/api/news`, `/api/publications`, `/api/team` at load.
  If the API is unavailable they fall back to the data bundled in the build, so
  the site never breaks.
- The admin dashboard lives at **`/admin`** (login at `/admin/login`).

## Repository layout

| Path | Purpose |
|------|---------|
| `backend/app/` | FastAPI app (models, routers, auth, serializers) |
| `backend/seed.py` + `backend/seed_data.json` | Seed the DB from the original content |
| `backend/.env.example` | Template for the server config (real `.env` is gitignored) |
| `deploy/arai-api.service` | systemd unit for the API |
| `deploy/nginx-api-location.conf` | nginx `/api/` proxy block |
| `deploy.sh` | Full deploy (backend + frontend) |
| `frontend/src/api/` | API client + content/admin calls |
| `frontend/src/pages/admin/` | Admin login + dashboard + forms |

## One-time server setup

Run once on the server (`ubuntu@137.74.116.118`). See the commands below or the
generated `~/arai-website/deploy/server_setup.sh` if present.

1. **Install MySQL** and create the database + app user:
   ```sql
   CREATE DATABASE arai_lab CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'arai_app'@'127.0.0.1' IDENTIFIED BY '<APP_DB_PASSWORD>';
   GRANT ALL PRIVILEGES ON arai_lab.* TO 'arai_app'@'127.0.0.1';
   FLUSH PRIVILEGES;
   ```
2. **Create `backend/.env`** from `.env.example` with the real DB password, a
   random `JWT_SECRET`, and the initial admin username/password.
3. **Install the systemd service:**
   ```bash
   sudo cp deploy/arai-api.service /etc/systemd/system/arai-api.service
   sudo systemctl daemon-reload
   sudo systemctl enable --now arai-api
   ```
4. **Add the nginx `/api/` proxy** (see `deploy/nginx-api-location.conf`) inside
   the `listen 443 ssl` server block, then `sudo nginx -t && sudo systemctl reload nginx`.
5. **Seed + build:** `./deploy.sh`

## Ongoing workflow (push here → pull there)

```bash
# locally
git push

# on the server
cd ~/arai-website
git pull
./deploy.sh
```

`deploy.sh` is safe to re-run: `seed.py` only fills tables that are empty, so it
never duplicates or overwrites content you edited in the dashboard.

## Managing content

Go to **https://qig-lab.net/admin**, sign in, and use the **News / Publications /
Team** tabs to add, edit, or delete entries. Changes are live immediately (the
public site reads from the same database). Use **Change password** after first
login.

## Notes

- All content is bilingual (EN/JP); each form has both fields.
- Team member detail sections (Education, Expertise, Responsibilities, Research
  Interests, Achievements) take one item per line.
- **Member photos** can be uploaded in the Team form (or you can paste a URL).
  Uploads are stored on the server in `/var/www/arai-uploads/` (created by
  `server_setup.sh`) and served by nginx at `/uploads/`. This directory lives
  *outside* the build dir that `deploy.sh` wipes, so photos persist across
  deploys. Consider including it in any backup job.
- Research areas are still bundled in the frontend (`data/researchData.js`) and
  were intentionally not moved to the database.
