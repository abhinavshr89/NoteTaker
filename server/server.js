const express = require('express')
const dotenv = require('dotenv')
const notes = require("./data/notes")
const app = express()
dotenv.config();

app.get('/',(req,res)=>{
    res.send('API is running!')
})

app.get('/notes',(req,res)=>{
    res.json(notes)
})

app.get('/notes/:id',(req,res)=>{
    const note = notes.find((n)=>n._id===req.params.id)
    res.json(note)
})
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server started on port {PORT}`)
})

