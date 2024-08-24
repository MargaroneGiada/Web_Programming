const express = require('express');
const router = express.Router();
const authMiddleware = require('./authMiddleware');
const User = require('../models/User');
const Event = require('../models/Event');
const Comment = require('../models/Comments');
const Partecipa = require('../models/Partecipa');


const http = require('http');
const socketIo = require('socket.io');
// Crea l'app Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        methods: ["GET", "POST"]
    }
});

router.post('/', async (req, res) => {
    const { eventId, userId } = req.body.dati;

    try {
        const existingRecord = await Partecipa.findOne({ event: eventId, user: userId });

        if (existingRecord) {
            return res.status(400).send('L\'utente è già registrato a questo evento');
        }

        const newPartecipation = new Partecipa({
            user: userId,
            event: eventId
        });

        await newPartecipation.save();
        console.log("Nuova Partecipazione", newPartecipation);
        res.status(200).send('Partecipazione confermata');
        console.log("Salvato");
    } catch (error) {
        console.error('Errore nel server:', error);
        res.status(500).send('Errore del server');
    }
});


router.post('/stop', async (req, res) => {
    const { eventId, userId } = req.body.dati;

    try {
        // Verifica se l'utente è già registrato per l'evento
        Partecipa.findOneAndDelete({ event: eventId, user: userId })
        .then(result => {
            res.status(200).json({
            message: 'Partecipation Deleted',
            result
            });
        })
        .catch(err => {
            console.log("Errore", err);
            res.status(500).json({
            message: 'Error Occured',
            error: err
            });
        });

    } catch (error) {
        console.error('Errore nel server:', error);
        res.status(500).send('Errore del server');
    }
});

router.get('/check', async (req, res) => {
    
    const eventId = req.query.eventId;
    const userId = req.query.userId;

    try {
        // Verifica se l'utente è già registrato per l'evento
        const existingRecord = await Partecipa.findOne({ event: eventId, user: userId });

        if (existingRecord) {
            console.log("------------Utente partecipa");
            return res.status(200).json({ message: 'L\'utente partecipa a questo evento', partecipa: true });
        } else {
            console.log("------------Utente NON partecipa");
            return res.status(200).json({ message: 'L\'utente non partecipa a questo evento', partecipa: false });
        }

    } catch (error) {
        console.error('Errore nel server:', error);
        res.status(500).send('Errore del server');
    }
});


module.exports = router;
