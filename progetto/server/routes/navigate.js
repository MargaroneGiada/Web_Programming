const express = require('express');
const router = express.Router();
const authMiddleware = require('./authMiddleware');
const organizerMiddleware = require('./organizerMiddleware');

router.get('/homepage', authMiddleware, (req, res) => {
    res.send('Homepage');
});

router.get('/chat', authMiddleware, (req, res) => {
    res.send('Chat');
});

router.get('/profilo', authMiddleware, (req, res) => {
    res.send('Profilo');
});

router.get('/organizzatore', authMiddleware, organizerMiddleware, (req, res) => {
    res.send('Organizer');
});

router.get('/organizzatore/crea', authMiddleware, organizerMiddleware, (req, res) => {
    res.send('Create');
});

router.get('/profilo', authMiddleware, organizerMiddleware, (req, res) => {
    res.send('Profilo');
});

router.get('/profilo', authMiddleware, organizerMiddleware, (req, res) => {
    res.send('Profilo');
});

module.exports = router;
