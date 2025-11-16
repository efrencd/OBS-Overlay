// server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', (msg) => {
    console.log('Mensaje recibido:', msg.toString());

    // Reenviamos a TODOS los demás clientes (broadcast)
    for (const client of wss.clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    }
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

console.log('Servidor WebSocket escuchando en ws://0.0.0.0:8080');
