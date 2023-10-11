import {WebSocketServer} from 'ws';
export class WebSocketController {
    #server;
    constructor(port){
        this.#server = new WebSocketServer({port: port});
        this.#server.on('connection', (ws) => {
            console.log('Client connected');
        });
        this.#server.on('close', (ws) => {
            console.log('WS server close');
        });
        console.log("\x1b[32m", 'WS server running at 0.0.0.0: ' + port)
          
    }
    sendTelemetry(data){
        this.#server.clients.forEach((client)=>{
            const serializedData = JSON.stringify(data);
            client.send(serializedData)
        })
    }
}


