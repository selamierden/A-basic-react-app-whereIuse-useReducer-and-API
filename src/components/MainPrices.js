import React, { useState, useEffect } from 'react';

function MainPrices() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=9&page=1&sparkline=false')
      .then(response => response.json())
      .then(data => setCryptoData(data))
      .catch(error => console.error('API error:', error));
  }, []);

  return (
    <div style={{backgroundColor: "darkblue"}} className='mt-4'>
      <div className="container">
        <div className="row">
          {cryptoData.map((crypto, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card" style={{ width: "100%", backgroundColor: "black", color: "white", borderRadius: "6px" }}>
                <div className="card-header" style={{ display: "flex", alignItems: "center" }}>
                  <img src={crypto.image} alt={crypto.name} style={{ width: "25px", height: "25px", marginRight: "10px" }} />
                  <h4>{crypto.symbol.toUpperCase()}</h4>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Price: ${crypto.current_price}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPrices;
