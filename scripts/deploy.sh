#!/usr/bin/env bash
set -euo pipefail

# Deploy portfolio to /var/www/portfolio on your VPS.
# Run from the project root after cloning the repo on the server.
#
# Usage:
#   chmod +x scripts/deploy.sh
#   ./scripts/deploy.sh

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_ROOT="/var/www/portfolio"

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
