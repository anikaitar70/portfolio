#!/usr/bin/env bash
set -euo pipefail

# Pull latest code and redeploy the portfolio on the VPS.
#
# One-time setup (as root):
#   chmod +x /var/www/portfolio/scripts/update-vps.sh
#   ln -sf /var/www/portfolio/scripts/update-vps.sh /usr/local/bin/update-portfolio
#
# Usage (after sudo -i):
#   update-portfolio

REPO_DIR="/var/www/portfolio"
DEPLOY_SCRIPT="$REPO_DIR/scripts/deploy.sh"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run as root: sudo -i"
  echo "Then: update-portfolio"
  exit 1
fi

if [[ ! -d "$REPO_DIR/.git" ]]; then
  echo "Git repo not found at $REPO_DIR"
  echo "Clone it first: git clone <your-repo-url> $REPO_DIR"
  exit 1
fi

if [[ ! -x "$DEPLOY_SCRIPT" ]]; then
  chmod +x "$DEPLOY_SCRIPT"
fi

echo "==> Pulling latest code..."
cd "$REPO_DIR"

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
git fetch origin "$BRANCH"
git pull --ff-only origin "$BRANCH"

echo "==> Deploying..."
exec "$DEPLOY_SCRIPT"
