import { useState,createContext, useEffect } from "react";

export const Coincontext=createContext();

const CoincontextProvider=(props)=>{
    const [allcoin,setAllcoin]=useState([]);
    const [currency,setCurrency]=useState({
        name:"inr",
        symbol:"₹",
    });
    const fetchall=async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-43ssgi6qRmBuLN9nANbXmsEi'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllcoin(response))
            .catch(err => console.error(err));
    }
    useEffect(()=>{
      fetchall();
    },[currency]);
    const contextvalue={
     allcoin,currency,setCurrency
    }
      return(
        <Coincontext.Provider value={contextvalue}>
            {props.children}
        </Coincontext.Provider>
      )
}
export default CoincontextProvider;