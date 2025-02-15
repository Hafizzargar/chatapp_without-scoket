const express = require('express');
const app = express();
const cors = require('cors');
const dbconnectionjs = require('./dbconnection');
const chatModel = require('./chatmodel');

// Use middleware for JSON parsing and URL encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5174", // Allow only this frontend
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    allowedHeaders: "Content-Type, Authorization", // Allowed headers
    credentials: true, // Allow cookies and authentication headers
}));

// POST route to send chat messages
app.post("/sendchats", async (req, res) => {
    const { chat, senderid, reciverid } = req.body;
    try {
        const newMessage = new chatModel({
            chat,
            senderid,
            reciverid
        });
        await newMessage.save();
        console.log("Chat sent successfully.");
        return res.json({ message: 'send chat', status: 201 });
    } catch (err) {
        console.log('Error while sending chat:', err);
        return res.json({ message: "server_side error", status: 500 });
    }
});

// GET route to fetch all chats
app.get('/getchats', async (req, res) => {
    try {
        const getData = await chatModel.find({});
        return res.json({ message: "get all data", status: 200, getData: getData });
    } catch (err) {
        console.log('Error in getchats:', err);
        return res.json({ message: "server_side error", status: 500 });
    }
});

// Create HTTP server for socket integration
const server = app.listen(4000, () => {
    console.log(`Server is running on http://localhost:4000`);
});

// Initialize Socket.IO
