import express from 'express';
import path from 'path';
import UdpController from "./src/socket/index.js";
import WebSocketController from "./src/web-socket/index.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 3000


const udp = new UdpController(50004)
const ws = new WebSocketController(9000)

udp.bindMessage((data) => ws.sendTelemetry(data))

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.listen(port, () => console.log(` Listening on port ${port}`));


