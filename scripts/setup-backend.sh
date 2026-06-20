#!/usr/bin/env bash
set -euo pipefail

# One-time backend setup on the VPS.
# Run as root from /var/www/portfolio after cloning the repo.
#
# Usage:
#   sudo ./scripts/setup-backend.sh

REPO_DIR="/var/www/portfolio"
ENV_FILE="/etc/portfolio-api.env"
SERVICE_NAME="portfolio-api"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run as root: sudo ./scripts/setup-backend.sh"
  exit 1
fi

cd "$REPO_DIR/backend"
npm ci --omit=dev

if [[ ! -f "$ENV_FILE" ]]; then
  JWT_SECRET="$(openssl rand -hex 32)"
  INGEST_KEY="$(openssl rand -hex 16)"

  cat > "$ENV_FILE" <<EOF
PORT=4000
NODE_ENV=production
ALLOWED_ORIGINS=https://anikait.page,https://www.anikait.page
ADMIN_PASSWORD_HASH=
JWT_SECRET=${JWT_SECRET}
INGEST_KEY=${INGEST_KEY}
WEB_ROOT=/var/www/anikait.page
DATA_DIR=/var/lib/portfolio-api
RESUME_FILENAME=Anikait_Resume.pdf
EOF

  chmod 600 "$ENV_FILE"
  echo "Created $ENV_FILE"
  echo ""
  echo "Set your admin password hash (use single quotes so \$2 is not expanded):"
  echo "  cd $REPO_DIR/backend && npm run hash-password -- 'YourStrongPassword'"
  echo "Then in $ENV_FILE set:"
  echo "  ADMIN_PASSWORD_HASH='\$2b\$10\$...paste-full-hash-here...'"
  echo ""
  echo "Add this to your frontend .env.local before building:"
  echo "  NEXT_PUBLIC_TELEMETRY_KEY=${INGEST_KEY}"
else
  echo "$ENV_FILE already exists — leaving it unchanged."
fi

mkdir -p /var/lib/portfolio-api
cp "$REPO_DIR/deploy/portfolio-api.service" "/etc/systemd/system/${SERVICE_NAME}.service"
systemctl daemon-reload
systemctl enable "$SERVICE_NAME"
systemctl restart "$SERVICE_NAME"
systemctl --no-pager status "$SERVICE_NAME"

chmod +x "$REPO_DIR/scripts/deploy.sh" "$REPO_DIR/scripts/update-vps.sh"
ln -sf "$REPO_DIR/scripts/update-vps.sh" /usr/local/bin/update-portfolio

echo ""
echo "Backend running. Admin panel: https://anikait.page/admin/"
echo "Remember to proxy /api and /admin in nginx and set ADMIN_PASSWORD_HASH."
echo ""
echo "To update the site after pushing to git: sudo -i && update-portfolio"
