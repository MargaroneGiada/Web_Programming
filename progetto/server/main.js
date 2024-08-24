require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT;
const http = require('http');
const socketIo = require('socket.io');
// Crea l'app Express
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { 
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    methods: ["GET", "POST"]
}));
app.use(express.json());


// Connessione a MongoDB
const mongoURI = 'mongodb://localhost:27017/eventi'; 
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('', require('./routes/navigate'));
app.use('/api/partecipate', require('./routes/partecipate'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve React frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

io.on('connection', (socketClient) => {
    console.log('Un utente si è connesso');

    socketClient.on("sendComment", (comment) => {
        console.log("nuovo commento arrivato", comment);
        socketClient.emit("newComment", comment);
        socketClient.broadcast.emit("newComment", comment);
    });

    socketClient.on('disconnect', () => {
        console.log('Utente disconnesso');
    });
});

// Start the server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));