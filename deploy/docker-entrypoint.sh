#!/bin/sh
set -e

mkdir -p /data /app/media

if [ ! -f /data/advokat-nsk.db ] && [ -f /app/seed/advokat-nsk.db ]; then
  cp /app/seed/advokat-nsk.db /data/advokat-nsk.db
fi

if [ -z "$(ls -A /app/media 2>/dev/null)" ] && [ -d /app/seed/media ]; then
  cp -a /app/seed/media/. /app/media/
fi

exec "$@"
