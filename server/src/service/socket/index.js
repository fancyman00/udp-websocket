import { createSocket }  from 'node:dgram';

export class UdpController {
    #server;
    constructor(port){
        this.#server = createSocket('udp4');
        this.#server.on('error', (err) => {
            console.log('Возникла ошибка: ', err)
            this.#server.close();
        });
        this.#server.on('listening', () => {
            const address = this.#server.address();
            console.log("\x1b[32m", `Udp server listening ${address.address}:${address.port}`);
        });
        this.#server.bind(port);
    }
    bindMessage(func){
        this.#server.on('message', (msg, rinfo) => {
            func(msg)
        });
    }
}


