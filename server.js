const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const Blob = require("cross-blob");
fs = require('fs');
chunks = []
videoURL = '';







app.use('/', express.static('public'))

io.on("connection", (socket) => {
    socket.join("room 227");
    console.log(1)
    socket.on("news", (data) => {
        console.log(data)
        // console.log(socket.client)
    if(data=="save"){
        saveFile();
    }
      })


    socket.on('chunks', (data) => {
        chunks.push(data)
        io.to("room 227").emit("chunk", data)
        console.log(data)
    })
    
  });

  async function saveFile() {
    var videoBlob = new Blob(chunks, { 'type' : 'video/webm' });
    const buffer = Buffer.from( await videoBlob.arrayBuffer() );

    fs.writeFile('video.webm', buffer, () => console.log('video saved!') );

}

// START THE SERVER =================================================================
const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})