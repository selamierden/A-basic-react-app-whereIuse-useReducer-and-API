import React, { useEffect, useState } from 'react';

function CoinList() {
  const [coinData, setCoinData] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    price: 'asc', // Varsayılan sıralama düzeni
    volume: 'asc',
    change: 'asc',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage_24h=true"
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 45000);

    return () => clearInterval(intervalId);
  }, []);

  // Veriyi sıralayan fonksiyon
  const sortData = (field) => {
    const order = sortOrder[field] === 'asc' ? 'desc' : 'asc';
    setSortOrder({ ...sortOrder, [field]: order });

    const sortedData = [...coinData].sort((a, b) => {
      if (order === 'asc') {
        return a[field] - b[field];
      } else {
        return b[field] - a[field];
      }
    });

    setCoinData(sortedData);
  };

  return (
    <div className='container mt-4'>
      <div className="d-flex justify-content-center">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>
              Rank <button className='btn' onClick={() => sortData('market_cap_rank')}><i className="bi bi-arrow-down-short"></i></button>
            </th>
            <th>
              Name 
            </th>
            <th>
              Icon
            </th>
            <th>
              Price <button className='btn' onClick={() => sortData('current_price')}><i className="bi bi-arrow-down-short"></i></button>
            </th>
            <th>
              Change <button className='btn' onClick={() => sortData('price_change_percentage_24h')}><i className="bi bi-arrow-down-short"></i></button>
            </th>
            <th>
              Volume <button className='btn' onClick={() => sortData('total_volume')}><i className="bi bi-arrow-down-short"></i></button>
            </th>
          </tr>
        </thead>
        <tbody>
          {coinData.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.market_cap_rank}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>
                <img
                  src={coin.image}
                  alt={coin.name}
                  width="25"
                  height="25"
                />
              </td>
              <td>${coin.current_price}</td>
              <td
                style={{
                  color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red',
                }}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td>${coin.total_volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default CoinList;
