#!/usr/bin/env bash
# MySQL setup for self-hosting Tif Technologies on your own server.
# Run once on the server:  sudo bash scripts/setup-mysql.sh
set -e

DB_NAME="${DB_NAME:-tif_db}"
DB_USER="${DB_USER:-tif_user}"
DB_PASS="${DB_PASS:-change-this-password}"

mysql -u root <<SQL
CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';
GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost';
FLUSH PRIVILEGES;
SQL

echo "Database '${DB_NAME}' and user '${DB_USER}' are ready."
echo "Set in backend/.env:"
echo "MYSQL_URL=\"mysql+aiomysql://${DB_USER}:${DB_PASS}@localhost:3306/${DB_NAME}\""
echo "Tables are auto-created on backend startup; site content and the admin user are seeded automatically."
