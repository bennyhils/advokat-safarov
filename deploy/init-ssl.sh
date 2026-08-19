#!/usr/bin/env bash
set -euo pipefail

DOMAIN="advokat-safarov.online"
EMAIL="safarov.lawyer@gmail.com"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LIVE="$ROOT/deploy/certbot/conf/live/$DOMAIN"

cd "$ROOT"

mkdir -p "$LIVE" "$ROOT/deploy/certbot/www"

if [ ! -s "$LIVE/fullchain.pem" ]; then
  echo "Создаю временный сертификат, чтобы Nginx смог стартовать..."
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout "$LIVE/privkey.pem" \
    -out "$LIVE/fullchain.pem" \
    -subj "/CN=$DOMAIN"
fi

if [ ! -f "$ROOT/.env" ]; then
  echo "Нет файла .env — скопируйте .env.example в .env и заполните PAYLOAD_SECRET"
  exit 1
fi

if ! docker image inspect advokat-nsk-app:latest >/dev/null 2>&1; then
  echo "Образ advokat-nsk-app:latest не найден — собираю на сервере (на 1 ГБ RAM это может занять долго)..."
  docker compose build app
fi

docker compose up -d --no-build app nginx

echo "Жду сайт..."
for i in $(seq 1 30); do
  if docker compose exec -T app wget -qO- http://127.0.0.1:3000/ >/dev/null 2>&1; then
    break
  fi
  sleep 2
done

echo "Запрашиваю Let's Encrypt..."
rm -rf "$LIVE"
docker compose run --rm --entrypoint certbot certbot certonly \
  --webroot -w /var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  --force-renewal \
  -d "$DOMAIN" \
  -d "www.$DOMAIN"

docker compose up -d certbot
docker compose exec -T nginx nginx -s reload || docker compose restart nginx

echo "Готово: https://$DOMAIN"
echo "Админка: https://$DOMAIN/admin"
