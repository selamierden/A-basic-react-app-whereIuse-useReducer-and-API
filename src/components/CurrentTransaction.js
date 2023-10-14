import React, { useState , useEffect } from "react";

function CurrentTransaction() {
  const [coin, setCoin] = useState("");
  const [amount, setAmount] = useState();
  const [purchasePrice, setPurchasePrice] = useState();
  const [leverage, setLeverage] = useState(1);
  const [direction, setDirection] = useState("Long");
  const cspots = [];

  useEffect(() => {
    loadTableFromLocalStorage();
  }, []);

  
  const calculateProfit = (
    direction,
    currentPrice,
    purchasePrice,
    amount,
    leverage
  ) => {
    const profit =
      direction === "Long"
        ? ((currentPrice / purchasePrice) * amount - amount) * leverage
        : -1 * (((currentPrice / purchasePrice) * amount - amount) * leverage);

    const profitRate = (profit / amount) * 100;
    return { profit, profitRate };
  };

  const addLocalStorage = (spot) => {
    let cspots = JSON.parse(localStorage.getItem("cspots")) || [];
    if (!Array.isArray(cspots)) {
        cspots = []; // "cspots" bir dizi değilse, boş bir dizi olarak başlatın
    }
    cspots.push(spot);
    localStorage.setItem("cspots", JSON.stringify(cspots));
  };

  function loadTableFromLocalStorage() {
    
  const cspots = JSON.parse(localStorage.getItem("cspots"));
  const table = document.getElementById("spot-table");

  table.innerHTML = "";

  for (const spot of cspots) {
    const row = table.insertRow(-1);

    for (let i = 0; i < 11; i++) {
      row.insertCell(i);
    }

    updateUIWithProfit(row, spot);

    row.cells[8].innerHTML =
      '<button id="deleteRowBtn"  class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>';
    row.cells[9].innerHTML =
      '<button id="refreshBtn"  class="btn btn-outline-primary"><i class="bi bi-arrow-clockwise"></i></button>';
    row.cells[10].innerHTML =
      '<button id="finishBtn"  class="d-flex align-items-baseline btn btn-outline-success">Sold <i class="bi bi-check-circle"></i></button>';
  }
  };

  const updateUIWithProfit = (row, spot) => {
    const {
      coin,
      amount,
      purchasePrice,
      leverage,
      direction,
      currentPrice,
      profit,
      profitRate,
    } = spot;

    row.cells[0].innerHTML = coin;
    row.cells[1].innerHTML = amount;
    row.cells[2].innerHTML = purchasePrice;
    row.cells[3].innerHTML = currentPrice.toFixed(2);
    row.cells[4].innerHTML = leverage;
    row.cells[5].innerHTML = direction;
    row.cells[6].innerHTML = profit.toFixed(2);
    row.cells[7].innerHTML = profitRate.toFixed(2) + "%";

    if (profitRate > 0) {
      row.cells[7].style.color = "green";
    } else {
      row.cells[7].style.color = "red";
    }

    if (profit > 0) {
      row.cells[6].style.color = "green";
    } else {
      row.cells[6].style.color = "red";
    }
  };

  const updateBalance = () => {
    var currentProfit = 0;
    var currentBalance = 0;

    if (cspots !== null) {
      for (var i = 0; i < cspots.length; i++) {
        currentBalance += parseFloat(cspots[i].amount);
      }
    }

    if (cspots !== null) {
      for (var j = 0; j < cspots.length; j++) {
        currentProfit += parseFloat(cspots[j].profit);
      }
    }

    var walletPrice = currentBalance + currentProfit;

    var walletDiv = document.getElementById("bakiye");
    walletDiv.textContent = "Current Balance : " + walletPrice.toFixed(3) + "$";

    var pnlDiv = document.getElementById("pnl");
    pnlDiv.textContent = "Current PNL : " + currentProfit.toFixed(2) + "$";
  };

  async function fetchCurrentPrice(coin) {
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data[coin.toLowerCase()].usd;
  }
  
  function createSpotRow(spot) {
    const table = document.getElementById("spot-table");
    const row = table.insertRow(-1);
  
    for (let i = 0; i < 11; i++) {
      row.insertCell(i);
    }
  
    updateUIWithProfit(row, spot);
  
    row.cells[8].innerHTML =
      '<button id="deleteRowBtn" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>';
    row.cells[9].innerHTML =
      '<button id="refreshBtn" class="btn btn-outline-primary"><i class="bi bi-arrow-clockwise"></i></button>';
    row.cells[10].innerHTML =
      '<button id="finishBtn" class="d-flex align-items-baseline btn btn-outline-success">Sold <i class="bi bi-check-circle"></i></button>';
  
    return row;
  }
  
  function handleDeleteRow(row, coin) {
    row.remove();
  
    const cspots = JSON.parse(localStorage.getItem("cspots"));
    const index = cspots.findIndex((spot) => spot.coin === coin);
  
    if (index > -1) {
      cspots.splice(index, 1);
      localStorage.setItem("cspots", JSON.stringify(cspots));
    }
    console.log("Silindi");
  }
  
  async function handleRefreshBtn(row, spot) {
    const currentPrice = await fetchCurrentPrice(spot.coin);
  
    spot.currentPrice = currentPrice;
  
    const { profit, profitRate } = calculateProfit(
      spot.direction,
      currentPrice,
      spot.purchasePrice,
      spot.amount,
      spot.leverage
    );
  
    spot.profit = profit;
    spot.profitRate = profitRate;
  
    updateUIWithProfit(row, spot);
    console.log("Yenilendi");
  }
  
  function handleFinishBtn(spot) {
    const soldSpot = {
      coin: spot.coin,
      amount: spot.amount,
      purchasePrice: spot.purchasePrice,
      leverage: spot.leverage,
      direction: spot.direction,
      currentPrice: spot.currentPrice,
      profit: spot.profit,
      profitRate: spot.profitRate,
    };
  
    const soldArray = JSON.parse(localStorage.getItem("spots")) || [];
    soldArray.push(soldSpot);
    localStorage.setItem("spots", JSON.stringify(soldArray));
  }
  
  async function SubmitForm() {
    const currentPrice = await fetchCurrentPrice(coin);
  
    const { profit, profitRate } = calculateProfit(
      direction,
      currentPrice,
      purchasePrice,
      amount,
      leverage
    );
  
    const spot = {
      coin,
      amount,
      purchasePrice,
      leverage,
      direction,
      currentPrice,
      profit,
      profitRate,
    };
  
    addLocalStorage(spot);
    const row = createSpotRow(spot);
  
    updateBalance();
  
    const deleteRowBtn = row.querySelector("#deleteRowBtn");
    const refreshBtn = row.querySelector("#refreshBtn");
    const finishBtn = row.querySelector("#finishBtn");
  
    deleteRowBtn.addEventListener("click", () => {
      handleDeleteRow(row, coin);
    });
  
    refreshBtn.addEventListener("click", () => {
      handleRefreshBtn(row, spot);
    });
  
    finishBtn.addEventListener("click", () => {
      handleFinishBtn(spot);
  
      row.remove();
  
      updateBalance();
    });
  }
  

  return (
    <div>
      <div
        className="container mt-5"
        style={{ color: "midnightblue", fontWeight: 600 }}
      >
        <h1 className="mb-4">Spot Purchase Records</h1>
        <form>
          <div
            className="row mb-3"
            style={{ display: "flex", alignItems: "flex-end" }}
          >
            <div className="col-md-2">
              <label htmlFor="coin">Cryptocurrency:</label>
              <input
                type="text"
                className="form-control"
                id="coin"
                value={coin}
                onChange={(e) => setCoin(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="purchasePrice">Purchase Price:</label>
              <input
                type="number"
                min={0}
                className="form-control"
                id="purchasePrice"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="leverage">Leverage:</label>
              <input
                placeholder="default : 1"
                type="number"
                min={0}
                className="form-control"
                id="leverage"
                value={leverage}
                onChange={(e) => setLeverage(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="longShort">Long/Short</label>
              <select
                className="form-control"
                id="longShort"
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
              >
                <option>Long</option>
                <option>Short</option>
              </select>
            </div>
            <div className="col-md-2">
              <button
                type="button"
                onClick={SubmitForm}
                className="btn mt-4"
                style={{ backgroundColor: "midnightblue", color: "white" }}
              >
                {" "}
                Save
              </button>
            </div>
          </div>
        </form>
        <table id="table" className="table" style={{ color: "midnightblue" }}>
          <thead>
            <tr>
              <th>Cryptocurrency</th>
              <th>Amount</th>
              <th>Purchase Price</th>
              <th>Current Price</th>
              <th>Kaldıraç</th>
              <th>Yön</th>
              <th>Instant Profit</th>
              <th>Instant Profit Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody  id="spot-table" style={{ color: "midnightblue" }}></tbody>
        </table>
        <div
          style={{
            fontSize: "17px",
            color: "white",
            backgroundColor: "green",
            marginTop: "10px",
            padding: "8px",
            borderRadius: "4px",
            textAlign: "center",
          }}
          id="pnl"
        >
          Current PNL:
        </div>
        <div
          style={{
            fontSize: "17px",
            color: "white",
            backgroundColor: "midnightblue",
            marginTop: "10px",
            padding: "8px",
            borderRadius: "4px",
            textAlign: "center",
          }}
          id="bakiye"
        >
          Current Balance: $
        </div>
        <br />
        <button id="clearbtn" className="btn btn-outline-danger">
          Clear
        </button>
      </div>
    </div>
  );
}

export default CurrentTransaction;
