# Тестовое приложение
Приложение для сервиса https://green-api.com/

## Локальный запуск

Понадобятся Node.js 24 и npm.

1. Установите зависимости:

   ```bash
   npm ci
   ```

2. Скопируйте `.env.example` в `.env` и укажите в `VITE_API_PATH` адрес API своего инстанса из кабинета GREEN-API. Например:

   ```env
   VITE_API_PATH=https://xxx.api.green-api.com
   ```

3. Запустите приложение:

   ```bash
   npm run dev
   ```

Откройте адрес, который покажет Vite, и введите `idInstance` и `apiTokenInstance` своего WhatsApp-инстанса.
