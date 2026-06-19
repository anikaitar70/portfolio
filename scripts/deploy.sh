#!/usr/bin/env bash
set -euo pipefail

# Deploy portfolio static export to the nginx web root.
# Keep the git repo and served files in separate directories.
#
# VPS layout:
#   /var/www/portfolio      -> git repo (clone from GitHub)
#   /var/www/anikait.page   -> built static files (nginx serves this)
#
# Usage:
#   chmod +x scripts/deploy.sh
#   ./scripts/deploy.sh

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_ROOT="/var/www/anikait.page"

echo "==> Building static site..."
cd "$APP_DIR"
npm ci
NODE_ENV=production npm run build

echo "==> Publishing to $WEB_ROOT..."
sudo mkdir -p "$WEB_ROOT"
# Keep live resume uploads managed by the admin API.
sudo rsync -a --delete --exclude 'resume/' "$APP_DIR/out/" "$WEB_ROOT/"
sudo rsync -a "$APP_DIR/out/resume/" "$WEB_ROOT/resume/" 2>/dev/null || sudo mkdir -p "$WEB_ROOT/resume"

echo "==> Updating backend API..."
cd "$APP_DIR/backend"
npm ci --omit=dev
if systemctl is-enabled portfolio-api >/dev/null 2>&1; then
  sudo systemctl restart portfolio-api
fi

echo "==> Reloading nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo "==> Deploy complete."
