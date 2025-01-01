const express = require('express');
const cors = require('cors');
const event = require('events')
const PORT = 5000;

const emiter = new event.EventEmitter();


const app = express()

app.use(cors())
app.use(express.json())

app.get('/get-message', (req,res)=>{
    emiter.once('newMessage', (message) =>{
        res.json(message)
    })
})

app.post('/new-message', (req, res)=>{
    const message = req.body
    emiter.emit('newMessage', message)
    res.status(200)
})

app.listen(PORT, () => console.log(`server start on port ${PORT}`));
