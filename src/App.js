
import './App.css';
import axios from "axios";
import {useEffect, useState} from 'react';
import Coin from './Coin';


function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=false#')
    .then(resp=>{setCoins(resp.data)})
    .catch(err=>{console.log(err)});

  }, []);

  console.log(coins);

  const handleChange = e =>{
    setSearch(e.target.value);
  }

  const filterCoins =coins.filter(coin=>{
    coin.name.toLowerCase().includes(search.toLowerCase());

  });

  


  return (
    <div className="coin_app">
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input type="text" placeholder='Search' className='coin-input' onChange={handleChange}/>  
        </form>
      </div>
      {coins.map(coin=>{
        return(
          <Coin 
         
          name={coin.name} 
          img={coin.image} 
          symbol={coin.symbol} 
          price={coin.current_price}
          volume = {coin.total_volume}
         
          ></Coin>
        )
      })}
    </div>
  );
}

export default App;
