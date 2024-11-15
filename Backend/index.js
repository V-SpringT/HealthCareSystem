const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();
app.use(cors());
app.use(express.json()); // Thay thế bodyParser.json()

const server = app.listen(3484, () => {
  console.log(`Server is running on http://localhost:3484`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', async (message) => {
    console.log(`Received data: ${message}`);

    try {
      const data = JSON.parse(message); 
      console.log("Data to be saved to MongoDB:", data);
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});