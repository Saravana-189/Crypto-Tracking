import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { Coincontext } from '../../context/Coincontext'
import Linechart from '../../components/Linechart/Linechart'

const Coin = () => {
  const {currency}=useContext(Coincontext);
  const [historicaldata,setHistoricaldata]=useState();
  const {coinId}=useParams();
  const [coindata,setCoindata]=useState();
  const fetchcoindata=async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-43ssgi6qRmBuLN9nANbXmsEi'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => setCoindata(response))
      .catch(err => console.error(err));
  }
  const fetchhistoricaldata=async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-43ssgi6qRmBuLN9nANbXmsEi'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(response => response.json())
      .then(response => setHistoricaldata(response))
      .catch(err => console.error(err));
  }
  useEffect(()=>{
    fetchcoindata();
    fetchhistoricaldata()
  },[currency]);
 if(coindata&&historicaldata){
  return (
    <div className='coin'>
      <div className="coinname">
        <img src={coindata.image.large}/>
        <p><b>{coindata.name} ({coindata.symbol.toUpperCase()})</b></p>
      </div>
      <div className="coinchart">
        <Linechart historicaldata={historicaldata}/>
      </div>
      <div className="coininfo">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coindata.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>{currency.symbol} {coindata.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>{currency.symbol} {coindata.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour high</li>
          <li>{currency.symbol} {coindata.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour low</li>
          <li>{currency.symbol} {coindata.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>
      </div>
      </div>
  )
 }
 else{
  return (
    <div className="spinner">
      <div className="spin"></div>
    </div>
  )
 }
}

export default Coin