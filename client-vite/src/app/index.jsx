import { Chart } from "../chart"
import './style.css'
import {useRef, useState} from "react";

const socket = new WebSocket('ws://localhost:9000');

socket.onopen = () => console.log('Соединение установлено');

socket.onclose = () => console.log('Соединение закрыто');


socket.onerror = (error) => console.log(`Ошибка: ${error.message}`);


function transformMessage(message){
  const data = JSON.parse(message)
  data.forEach((arr)=> {
    arr.forEach((item) => {
      item.x = new Date(item.x)
      item.y = 120 + item.y
    })
  })
  return data
}

function App() {
  const data1 = [{x: new Date(), y: 0}]
  const data2 = [{x: new Date(), y: 0}]

  const ref1 = useRef()
  const ref2 = useRef()

  socket.onmessage = function(event) {
    const message = transformMessage(event.data)
    data1.push(...message[0])
    data2.push(...message[1])
    if(data1.length > 500 && data2.length > 500)
      for(let i = 0; i<10; i++) {
        data1.shift()
        data2.shift()
      }
     ref1.current && ref1.current.render()
    ref2.current && ref2.current.render()
  };

  return (
    <div className="dashboard">
      <Chart title={'2.4'} data={data1} setRef={(ref)=>ref1.current = ref}/>
      <Chart title={'433'} data={data2} setRef={(ref)=>ref1.current = ref}/>
    </div>
  )
}

export default App
