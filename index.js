// Express сервер для Vercel
const express = require('express');
const cors = require('cors');

const app = express();

// CORS middleware
app.use(cors());
app.use(express.json());

let myVariable = 0;
let soil_moisture = "50";
let last_watering = "10:20";
let remember = 1000;

// GET endpoints
app.get('/', (req, res) => {
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
    <p>myVariable: ${myVariable}</p>
    <p>Soil Moisture: ${soil_moisture}</p>
    <p>Last Watering: ${last_watering}</p>
    <p>Remember: ${remember}</p>
  </div>
</body>
</html>
  `;
  res.send(html);
});

app.get('/myVariable', (req, res) => {
  res.json({ value: myVariable });
});

app.get('/soil_moisture', (req, res) => {
  res.json({ value: soil_moisture });
});

app.get('/last_watering', (req, res) => {
  res.json({ value: last_watering });
});

app.get('/remember', (req, res) => {
  res.json({ value: remember });
});

// POST endpoint
app.post('/ljnkjdhui37rhufeh77fhyh744hf347yfh723ryhf78', (req, res) => {
  const body = req.body;
  if (body.hasOwnProperty("myVariable")) {
    myVariable = body.myVariable;
  }
  if (body.hasOwnProperty("soil_moisture")) {
    soil_moisture = body.soil_moisture;
  }
  if (body.hasOwnProperty("last_watering")) {
    last_watering = body.last_watering;
  }
  if (body.hasOwnProperty("remember")) {
    remember = body.remember;
  }
  if (body.hasOwnProperty("calibrate") && body.calibrate === true) {
    remember = parseInt(soil_moisture);
  }
  res.status(200).json({ success: true, myVariable, soil_moisture, last_watering, remember });
});

// Vercel serverless export
module.exports = app;
