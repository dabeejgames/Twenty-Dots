const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } }); // CORS for dev

let rooms = {}; // roomId: { players: [socketIds], state: {} }

io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    if (!rooms[roomId]) rooms[roomId] = { players: [], state: null };
    rooms[roomId].players.push(socket.id);
    io.to(roomId).emit('players', rooms[roomId].players.length);
  });

  socket.on('game-action', ({ roomId, action }) => {
    // Update rooms[roomId].state here!
    io.to(roomId).emit('game-action', action);
  });

  socket.on('disconnect', () => {
    // Remove from rooms, handle cleanup...
    for (const roomId in rooms) {
      const index = rooms[roomId].players.indexOf(socket.id);
      if (index !== -1) {
        rooms[roomId].players.splice(index, 1);
        if (rooms[roomId].players.length === 0) {
          delete rooms[roomId];
        }
        break;
      }
    }
  });
});

server.listen(4000, () => console.log('Server running on :4000'));