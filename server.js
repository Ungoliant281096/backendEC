const express = require('express');
const server = express();
const port = 1717;


server.get("/", (req, res ) => {
    res.send("Hola mundo!")
})

server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
})
