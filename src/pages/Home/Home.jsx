import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { Coincontext } from '../../context/Coincontext'
import { Link } from 'react-router-dom'
const Home = () => {
    const {allcoin,currency}=useContext(Coincontext);
    const [displaycoin,setDisplaycoin]=useState([]);
    const [input,setInput]=useState('');
    const inputhandler=(e)=>{
     setInput(e.target.value);
     if(e.target.value===''){
        setDisplaycoin(allcoin);
     }
    }
    const searchhandler=async (e)=>{
        e.preventDefault();
        const coins=await  allcoin.filter((item)=>{
            return item.name.toLowerCase().includes(input.toLowerCase())
        })
        setDisplaycoin(coins);
    }

    useEffect(()=>{
        setDisplaycoin(allcoin)
    },[allcoin])

  return (
    <div className='home'>
        <div className="hero">
            <h1>Largest <br />Crypto Marketplace</h1>
            <p>
            Find the best cryptocurrency hub! Discover the most recent information, news, and trends to help you on your journey through the revolution in digital currency.
            </p>
            <form onSubmit={searchhandler}>
                <input type='text' value={input} list='coinlist' placeholder='Search crypto' onChange={inputhandler}/>
                <datalist id='coinlist'>
                    {
                        allcoin.map((item,i)=>{
                            return (
                                <option key={i} value={item.name}/>
                            )
                        })
                    }
                </datalist>
                <button type='submit'>Search</button>
            </form>
        </div>
        <div className="cryptotable">
            <div className="tablelayout">
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p style={{textAlign:"center"}}>24 Hour Change</p>
                <p className='market'>Marget Cap</p>
            </div>
            {
                displaycoin.slice(0,10).map((item,i)=>(
                    <Link to={`/coin/${item.id}`} className="tablelayout" key={i}>
                        <p>{item.market_cap_rank}</p>
                        <div>
                            <img src={item.image}/>
                            <p>{item.name+' - '+item.symbol}</p>
                        </div>
                        <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                        <p className={item.price_change_percentage_24h>0?"green":"red"}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
                        <p className='market'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default Home