// Express сервер для Vercel с Upstash Redis хранилищем
const express = require('express');
const cors = require('cors');
const { Redis } = require('@upstash/redis');

const app = express();

// Инициализация Redis клиента
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// CORS middleware
app.use(cors());
app.use(express.json());

// Инициализация значений по умолчанию
const DEFAULTS = {
  myVariable: 0,
  soil_moisture: "50",
  last_watering: "10:20",
  remember: 1000
};

// GET endpoints
app.get('/', async (req, res) => {
  try {
    const [myVariable, soil_moisture, last_watering, remember] = await Promise.all([
      redis.get('myVariable'),
      redis.get('soil_moisture'),
      redis.get('last_watering'),
      redis.get('remember')
    ]);

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Server Status</title>
  <style>
    body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f0f0f0; }
    .container { text-align: center; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <div class="container">
    <h1>Current Values</h1>
    <p>myVariable: ${myVariable ?? DEFAULTS.myVariable}</p>
    <p>Soil Moisture: ${soil_moisture ?? DEFAULTS.soil_moisture}</p>
    <p>Last Watering: ${last_watering ?? DEFAULTS.last_watering}</p>
    <p>Remember: ${remember ?? DEFAULTS.remember}</p>
  </div>
</body>
</html>
    `;
    res.send(html);
  } catch (err) {
    console.error('Redis error:', err);
    res.send('Server running (Redis not configured)');
  }
});

app.get('/myVariable', async (req, res) => {
  try {
    const value = await redis.get('myVariable');
    res.json({ value: value ?? DEFAULTS.myVariable });
  } catch (err) {
    console.error('Redis error:', err);
    res.json({ value: DEFAULTS.myVariable });
  }
});

app.get('/soil_moisture', async (req, res) => {
  try {
    const value = await redis.get('soil_moisture');
    res.json({ value: value ?? DEFAULTS.soil_moisture });
  } catch (err) {
    console.error('Redis error:', err);
    res.json({ value: DEFAULTS.soil_moisture });
  }
});

app.get('/last_watering', async (req, res) => {
  try {
    const value = await redis.get('last_watering');
    res.json({ value: value ?? DEFAULTS.last_watering });
  } catch (err) {
    console.error('Redis error:', err);
    res.json({ value: DEFAULTS.last_watering });
  }
});

app.get('/remember', async (req, res) => {
  try {
    const value = await redis.get('remember');
    res.json({ value: value ?? DEFAULTS.remember });
  } catch (err) {
    console.error('Redis error:', err);
    res.json({ value: DEFAULTS.remember });
  }
});

// POST endpoint
app.post('/ljnkjdhui37rhufeh77fhyh744hf347yfh723ryhf78', async (req, res) => {
  const body = req.body;
  
  let myVariable = await redis.get('myVariable') ?? DEFAULTS.myVariable;
  let soil_moisture = await redis.get('soil_moisture') ?? DEFAULTS.soil_moisture;
  let last_watering = await redis.get('last_watering') ?? DEFAULTS.last_watering;
  let remember = await redis.get('remember') ?? DEFAULTS.remember;

  if (body.hasOwnProperty("myVariable")) {
    myVariable = body.myVariable;
    await redis.set('myVariable', myVariable);
  }
  if (body.hasOwnProperty("soil_moisture")) {
    soil_moisture = body.soil_moisture;
    await redis.set('soil_moisture', soil_moisture);
  }
  if (body.hasOwnProperty("last_watering")) {
    last_watering = body.last_watering;
    await redis.set('last_watering', last_watering);
  }
  if (body.hasOwnProperty("remember")) {
    remember = body.remember;
    await redis.set('remember', remember);
  }
  if (body.hasOwnProperty("calibrate") && body.calibrate === true) {
    remember = parseInt(soil_moisture);
    await redis.set('remember', remember);
  }

  res.status(200).json({ success: true, myVariable, soil_moisture, last_watering, remember });
});

// Vercel serverless export
module.exports = app;
