import CanvasJSReact from '@canvasjs/react-charts';
import {useEffect} from "react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export const Chart = (props) => {
  const {title, data, setRef}=  props

  const options = {
    theme: "light2",
    title:{
      text: title
    },
    axisY:{
      labelFontColor: "black" ,
      lineColor: "black" ,
      lineThickness: 1,
      gridThickness: 1,
      tickThickness: 1,
      viewportMinimum: 120 - 110,
      viewportMaximum: 120 - 20,
      minimum: 120 - 110,
      maximum: 120-20,
      labelFormatter: function(){
        return " ";
      }
    }, 
    axisX:{
      gridDashType: "none",
      labelFontColor: "black" ,
      valueFormatString:"mm:ss.ff",
      lineThickness: 1,
      tickThickness: 1
    },
    toolTip:{  
      contentFormatter: function ( e ) {
        return "Value: " +  (e.entries[0].dataPoint.y -120);
        }  
     },
    data: [{
      type: "stepArea",
      dataPoints: data
    }]
  }
  useEffect(()=>{
    const toRemove = document.getElementsByClassName('canvasjs-chart-credit');
    while (toRemove.length > 0) toRemove[0].remove();
  }, [])
  return(
      <CanvasJSChart containerProps={{ width: '100vw', height: '45vh' }} options={options} onRef={ref => setRef(ref)}  />
  )
}