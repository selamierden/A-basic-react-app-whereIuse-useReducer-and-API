import React from 'react'
import Navbar from './components/Navbar'
import VideoComponent from './components/VideoComponent'
import Footer from './components/Footer'
import MainPrices from './components/MainPrices'
import CoinList from './components/CoinList'

function App() {
  return (
    <div style={{backgroundColor:"darkblue"}}>
      <Navbar></Navbar>
      <CoinList></CoinList>
    </div>
  )
}

export default App