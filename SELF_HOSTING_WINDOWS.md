# Tif Technologies — Self-Hosting Guide (Windows Server)

This package contains the full website: React frontend, FastAPI backend, and a MySQL database dump (`tif_db_dump.sql`).

## 1. Install required software

1. **Node.js LTS** — https://nodejs.org (install, then open a new terminal and run `npm i -g yarn`)
2. **Python 3.11+** — https://www.python.org/downloads/ (tick "Add python.exe to PATH" during install)
3. **MySQL 8** — https://dev.mysql.com/downloads/installer/ (choose "Server" + enable "MySQL as a Windows Service"; remember the root password you set)
4. **NSSM** (optional, to run the backend as a Windows service) — https://nssm.cc

## 2. Create the database and import data

Open "MySQL 8.0 Command Line Client" (or `mysql.exe -u root -p`) and run:

```sql
CREATE DATABASE tif_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'tif_user'@'localhost' IDENTIFIED BY 'YourStrongPassword';
GRANT ALL PRIVILEGES ON tif_db.* TO 'tif_user'@'localhost';
FLUSH PRIVILEGES;
```

Then import the dump (from a terminal in this folder):

```
mysql -u root -p tif_db < tif_db_dump.sql
```

This restores all website content, the admin user, and enquiries. (If you skip the import, the backend auto-creates empty tables and seeds the default content + admin user on first start.)

## 3. Configure and run the backend

```
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Edit `backend\.env` (Notepad or VS Code) and set:

```
MYSQL_URL="mysql+aiomysql://tif_user:YourStrongPassword@localhost:3306/tif_db"
JWT_SECRET="<any long random string, 64+ characters>"
ADMIN_EMAIL="you@yourcompany.com"
ADMIN_PASSWORD="<choose a strong admin password>"
OWNER_EMAIL="you@yourcompany.com"
```

Start the backend:

```
uvicorn server:app --host 0.0.0.0 --port 8001
```

Verify: open `http://localhost:8001/api/` — it should reply `{"message":"Tif Technologies API is running","database":"MySQL"}`.

To run it as a Windows service (starts automatically with the server):

```
nssm install TifBackend "C:\full\path\to\backend\.venv\Scripts\uvicorn.exe" "server:app --host 0.0.0.0 --port 8001"
nssm set TifBackend AppDirectory "C:\full\path\to\backend"
nssm start TifBackend
```

## 4. Build and serve the frontend

Edit `frontend\.env` first — set the address where visitors' browsers can reach your backend:

```
REACT_APP_BACKEND_URL=http://your-server-ip-or-domain
```

(no `/api` at the end — the app adds it automatically.)

Then:

```
cd frontend
yarn install
yarn build
```

This creates a `build` folder with the finished website. Serve it either way:

**Simple option:**
```
npm i -g serve
serve -s build -l 3000
```

**IIS option:** create a site pointing at the `build` folder, install the IIS "URL Rewrite" module, and add a rule that rewrites all non-file paths to `/index.html` (needed so /services, /portfolio etc. load correctly).

To keep `serve` running after reboot, register it with NSSM the same way as the backend.

## 5. Firewall / ports

Open inbound TCP ports **8001** (API) and **3000** (website) in Windows Defender Firewall — or put both behind IIS/ARR on ports 80/443 with a proper domain and SSL certificate.

## 6. First login

Open `http://your-server:3000/admin` and sign in with the ADMIN_EMAIL / ADMIN_PASSWORD you set in `backend/.env` (the dump ships with admin@tiftechnologies.com / TifAdmin@2026 — change it in .env and restart the backend; the seed re-syncs it). From there you can edit all site content, manage portfolio projects, create new pages, and read enquiries.

## Notes

- **Enquiry email alerts** are sent through the Emergent email service tied to this account's Universal Key. If self-hosting fully offline from Emergent, leave `OWNER_EMAIL` empty (emails are skipped) or ask us to wire your own SMTP.
- Database backups: `mysqldump -u root -p tif_db > backup.sql` — schedule it with Task Scheduler.
