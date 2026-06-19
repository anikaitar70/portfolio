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
sudo rsync -a --delete "$APP_DIR/out/" "$WEB_ROOT/"

echo "==> Reloading nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo "==> Deploy complete."
