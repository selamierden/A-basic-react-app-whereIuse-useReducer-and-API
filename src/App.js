import React from 'react'
import Navbar from './components/Navbar'
import VideoComponent from './components/VideoComponent'
import Footer from './components/Footer'
import MainPrices from './components/MainPrices'
import CoinList from './components/CoinList'
import { CurrencyBitcoin } from 'react-bootstrap-icons'
import CurrentTransaction from './components/CurrentTransaction'

function App() {
  
  return (
    <div>
      <CurrentTransaction></CurrentTransaction>
    </div>
  )
}

export default App