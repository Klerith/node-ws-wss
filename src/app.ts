import { WebSocketServer, WebSocket } from 'ws';



const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {


  console.log('Client connected');

  ws.on('error', console.error);

  ws.on('message', function message(data) {

    const payload = JSON.stringify({
      type: 'custom-message',
      payload: data.toString(),
    })
    // ws.send( JSON.stringify(payload) );

    //* Todos - incluyente
    // wss.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(payload, { binary: false });
    //   }
    // });

    // * Todos excluyente
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });
    

  });

  // ws.send('Hola desde el servidor!');

  ws.on('close', () => {
    console.log('Client disconnected');
  })

});


console.log('http://localhost:3000');