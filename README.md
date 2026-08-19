# Сайт адвоката Сафарова

Сайт и админка для [advokat-safarov.online](https://advokat-safarov.online): услуги, практика, новости, заявка по телефону, CMS на Payload.

Стек: Next.js, Payload CMS, SQLite, Docker, Nginx, Let’s Encrypt.

## Локальный запуск

```bash
cp .env.example .env
npm install
npm run dev
```

- Сайт: [http://localhost:3000](http://localhost:3000)
- Админка: [http://localhost:3000/admin](http://localhost:3000/admin)

Первый вход (сразу смените пароль в админке):

- email: `admin@advokat.local`
- пароль: `admin12345`

В `.env` для локалки достаточно:

```env
PAYLOAD_SECRET=любая-длинная-строка
SERVER_URL=http://localhost:3000
```

## Что менять без кода

В админке, **Настройки сайта**:

- телефон (кнопки «Позвонить», WhatsApp / Telegram / Max, если отдельные поля пустые)
- email, адрес, часы, ссылки на палату и 2ГИС
- ФИО, фото, тексты главной
- уведомления о заявках в Telegram

Коллекции: услуги, практика, новости, отзывы, заявки, медиа.

### Telegram для заявок

1. Бот в `@BotFather` — скопировать токен.
2. Написать боту любое сообщение.
3. Узнать chat id у `@userinfobot`.
4. Вставить токен и chat id в настройки, включить отправку заявок.

## Деплой на VPS (Docker)

На сервере три контейнера: **app** (сайт), **nginx** (80/443), **certbot** (обновление сертификата).

VPS с ~1 ГБ RAM **не тянет** `next build`. Образ собирают на Mac/CI и заливают готовый. На сервере только `docker load` и `docker compose up`.

### 1. DNS

A-записи `@` и `www` на IP сервера, например `87.199.192.83`.

### 2. Сервер

Ubuntu, Docker + Compose, каталог `/var/www/advokat-nsk`.

На 1 ГБ RAM нужен swap (один раз):

```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

Docker:

```bash
curl -fsSL https://get.docker.com | sh
```

Код на сервер (без `node_modules` и `.next`):

```bash
git clone https://github.com/bennyhils/advokat-safarov.git /var/www/advokat-nsk
cd /var/www/advokat-nsk
```

### 3. Переменные окружения

```bash
cp .env.example .env
nano .env
```

В проде обязательно:

```env
DATABASE_URL=file:///data/advokat-nsk.db
PAYLOAD_SECRET=случайная-длинная-строка
SERVER_URL=https://advokat-safarov.online
NODE_ENV=production
ADMIN_EMAIL=ваш@email
ADMIN_PASSWORD=сильный-пароль
```

Секрет:

```bash
openssl rand -hex 32
```

База и загруженные фото живут в Docker volumes (`sqlite-data`, `media-data`), при обновлении образа они не стираются.

### 4. Сборка образа (на Mac или другой машине с RAM)

Нужен Docker Desktop. Образ должен быть **linux/amd64** (сервер x86_64; на Apple Silicon без флага `--platform` получится arm64 и на VPS не запустится).

```bash
docker build --platform linux/amd64 -t advokat-nsk-app:latest .
docker save advokat-nsk-app:latest | gzip -1 > /tmp/advokat-nsk-app.tar.gz
rsync -a --progress /tmp/advokat-nsk-app.tar.gz root@IP_СЕРВЕРА:/tmp/
```

На сервере:

```bash
gunzip -c /tmp/advokat-nsk-app.tar.gz | docker load
rm /tmp/advokat-nsk-app.tar.gz
cd /var/www/advokat-nsk
chmod +x deploy/init-ssl.sh deploy/docker-entrypoint.sh
```

Если RAM на VPS хватает (от ~4 ГБ), можно собрать там:

```bash
cd /var/www/advokat-nsk
docker compose build app
```

### 5. Первый запуск и SSL

Образ `advokat-nsk-app:latest` уже должен быть на сервере.

```bash
cd /var/www/advokat-nsk
./deploy/init-ssl.sh
```

Скрипт поднимает app + nginx, выпускает сертификат Let’s Encrypt на `advokat-safarov.online` и `www`, включает автообновление.

Сайт: https://advokat-safarov.online  
Админка: https://advokat-safarov.online/admin

Порты 80 и 443 должны быть открыты. Скрипт SSL запускайте только при первом деплое (или если сертификата ещё нет): у Let’s Encrypt лимит выпусков.

### 6. Обновление сайта

1. Собрать новый образ на Mac (шаг 4).
2. Залить и `docker load` на сервер.
3. Подтянуть код, если менялись `docker-compose.yml` или nginx:

```bash
cd /var/www/advokat-nsk
git pull
docker compose up -d --no-build
```

`--no-build` важен: иначе Compose начнёт собирать Next.js на слабом VPS.

Проверка:

```bash
docker compose ps
docker compose logs -f app
curl -I https://advokat-safarov.online
```

## Полезные команды на сервере

```bash
cd /var/www/advokat-nsk
docker compose ps
docker compose logs --tail=80 app nginx certbot
docker compose restart app
```

Откат к предыдущему образу: загрузить старый tar и снова `docker compose up -d --no-build`.
