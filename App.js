  import React,{useState,useEffect}from 'react';
  import axios from 'axios';
import './App.css';
import Coin from './Coin';

  
//https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false
function App() {
  const [coins,setCoins]=useState([]);   
  const [search,setSearch]=useState('');
   useEffect(()=>{
    var value=false;
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=${value}`)
     .then(response=>{
         setCoins(response.data);
         console.log(response.data);
     }).catch(errors=>{console.log(errors)})
   },[]);

 const handleChange=(e)=>{
  setSearch(e.target.value);
}

const filterCoins=coins.filter(coin =>
   coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    
    <div className="coin-app">
      <div className='image'>
        <img src='logo512.png' alt='logo'></img>
      </div>
      <div className='coin-search'>
      <h1>Search a Crypto currency</h1>
      <form>
        <input type="text" placeholder='Search Coin' className='coin-input' onChange={handleChange}></input>
      </form>
      </div>
      {filterCoins.map(coin=>{
        return (
          <Coin 
          key={coin.id}
          name={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
          />
        )
      })}

      <div className='footer'>Made by K.DHARMA REDDY</div>
    </div>
  );
}

export default App;
