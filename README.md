# Сервер управления поливом

## Структура папки

```
server/
├── package.json        # Зависимости и скрипты
├── app.js              # Точка входа для Vercel (основной сервер)
├── server.js           # Локальный сервер Express
├── vercel.json         # Конфигурация для Vercel
├── api/
│   └── index.js        # Serverless функция для Vercel (альтернатива)
└── README.md           # Этот файл
```

## Запуск локального сервера

1. Установите зависимости:
   ```bash
   npm install
   ```

2. Запустите сервер:
   ```bash
   npm start
   ```

3. Сервер будет доступен по адресу: `http://localhost:3000`

## API Endpoints

### GET запросы
- `/` - Страница статуса сервера
- `/myVariable` - Получить значение myVariable
- `/soil_moisture` - Получить значение soil_moisture
- `/last_watering` - Получить значение last_watering
- `/remember` - Получить значение remember

### POST запрос
- `/ljnkjdhui37rhufeh77fhyh744hf347yfh723ryhf78` - Обновить переменные

Пример POST запроса:
```json
{
  "myVariable": 10,
  "soil_moisture": "60",
  "last_watering": "14:30",
  "remember": 500
}
```

Пример калибровки:
```json
{
  "calibrate": true
}
```

## Развёртывание на Vercel

1. Убедитесь, что структура папок соответствует:
   ```
   server/
   ├── api/
   │   └── index.js
   └── vercel.json
   ```

2. Задеплойте через Vercel CLI:
   ```bash
   vercel --prod
   ```

## Примечания

- Файл `remember.txt` создаётся автоматически для сохранения значения `remember` между перезапусками сервера
- CORS настроен для разрешения запросов с любых источников
- Для продакшена статические файлы обслуживаются из `../client/dist`
