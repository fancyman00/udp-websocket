import { createSocket }  from 'node:dgram';
import {byteArrayToIntArray} from "../tools/index.js";


class UdpController {
    #server;
    #buffer1 = [];
    #buffer2 = [];
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
        this.#server.on('message', (msg) => {
            const data = byteArrayToIntArray(msg)
            const datetime = new Date()
            this.#buffer1.push({x:datetime, y: data[0]})
            this.#buffer2.push({x:datetime, y: data[1]})
            if(this.#buffer1.length === 10 || this.#buffer2.length === 10 ){
                func([this.#buffer1, this.#buffer2])
                this.#buffer1 = []
                this.#buffer2 = []
            }
        });
    }
}
export default UdpController

