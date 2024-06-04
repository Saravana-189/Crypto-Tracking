import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const Linechart = ({ historicaldata }) => {
  const [data, setData] = useState([["Date", "Prices"]]);
  console.log(historicaldata)

  useEffect(() => {
    let datacopy=[["Date","Prices"]];
    if(historicaldata.prices){
      historicaldata.prices.map((item)=>{
        datacopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`,item[1]]);
      })
      setData(datacopy);
    }
  }, [historicaldata]);

  return (
    <Chart
      chartType='LineChart'
      data={data}
      height='100%'
      legendToggle
    />
  );
}

export default Linechart;
