import React, { useState , useEffect } from "react";

function TransactionRecord() {

  const [coin, setCoin] = useState("");
  const [amount, setAmount] = useState();
  const [purchasePrice, setPurchasePrice] = useState();
  const [lastPrice , setLastPrice] = useState(0);
  const [leverage, setLeverage] = useState(1);
  const [direction, setDirection] = useState("Long");
  const [profit, setProfit] = useState(0)

  useEffect(() => {
    loadTableFromLocalStorage();
  }, []);


  const addLocalStorage = (spot) => {
    let spots = JSON.parse(localStorage.getItem("spots")) || [];
    if (!Array.isArray(spots)) {
        spots = []; 
    }
    spots.push(spot);
    localStorage.setItem("spots", JSON.stringify(spots));
  };

  function loadTableFromLocalStorage() {
    const spots = JSON.parse(localStorage.getItem("spots"));
    const table = document.getElementById("spot-table");
    
  
    table.innerHTML = "";
  
    for (const spot of spots) {
      const row = createSpotRow(spot);  // Create a row using your existing function
  
      // Get the buttons in the row
      const deleteRowBtn = row.querySelector("#deleteRowBtn");
  
      // Attach event listeners to the buttons
      deleteRowBtn.addEventListener("click", () => {
        handleDeleteRow(row, spot.coin);
      });
  
      table.appendChild(row);
    }

    updateBalance();
  }

  const updateUIWithProfit = (row, spot) => {
    const {
      coin,
      amount,
      purchasePrice,
      leverage,
      direction,
      lastPrice,
      profit,
    } = spot;

    row.cells[0].innerHTML = coin;
    row.cells[1].innerHTML = amount;
    row.cells[2].innerHTML = purchasePrice;
    row.cells[3].innerHTML = lastPrice;
    row.cells[4].innerHTML = leverage;
    row.cells[5].innerHTML = direction;
    row.cells[6].innerHTML = profit;

    if (profit > 0) {
      row.cells[6].style.color = "green";
    } else {
      row.cells[6].style.color = "red";
    }
    
    updateBalance();
  };

  const updateBalance = () => {
    var spots = JSON.parse(localStorage.getItem("spots"));

    var currentProfit = 0;
    var currentBalance = 0;

    if (spots !== null) {
      for (var i = 0; i < spots.length; i++) {
        currentBalance += parseFloat(spots[i].amount);
      }
    }

    if (spots !== null) {
      for (var j = 0; j < spots.length; j++) {
        currentProfit += parseFloat(spots[j].profit);
      }
    }

    var walletPrice = currentBalance + currentProfit;

    var walletDiv = document.getElementById("bakiye");
    walletDiv.textContent = "Current Balance : " + walletPrice.toFixed(3) + "$";

    var profitDiv = document.getElementById("profit");
    profitDiv.textContent = "Current PNL : " + currentProfit.toFixed(2) + "$";

    console.log(walletPrice);
    console.log(currentProfit);
  };
  
  function createSpotRow(spot) {
    const table = document.getElementById("spot-table");
    const row = table.insertRow(-1);
  
    for (let i = 0; i < 11; i++) {
      row.insertCell(i);
    }
  
    updateUIWithProfit(row, spot);
  
    row.cells[8].innerHTML =
      '<button id="deleteRowBtn" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>';
  
    return row;
  }
  
  function handleDeleteRow(row, coin) {
    row.remove();
  
    const spots = JSON.parse(localStorage.getItem("spots"));
    const index = spots.findIndex((spot) => spot.coin === coin);
  
    if (index > -1) {
      spots.splice(index, 1);
      localStorage.setItem("spots", JSON.stringify(spots));
    }

    updateBalance();
  }
  
  async function SubmitForm() {
  
    const spot = {
      coin,
      amount,
      purchasePrice,
      leverage,
      direction,
      lastPrice,
    };
  
    addLocalStorage(spot);
    const row = createSpotRow(spot);
  
    const deleteRowBtn = row.querySelector("#deleteRowBtn");
  
    deleteRowBtn.addEventListener("click", () => {
      handleDeleteRow(row, coin);
    });

    updateBalance();
  }

  const clearTable = () => {
    var table = document.getElementById("table");

    while(table.rows.length > 1){
      table.deleteRow(-1)
    }

    localStorage.setItem("spots", JSON.stringify([]));

    updateBalance();
  }

  return (
    <div>
      <div
        className="container mt-5"
        style={{ color: "midnightblue", fontWeight: 600 }}
      >
        <h1 className="mb-4">Transaction Records</h1>
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
            <div className="col-md-1">
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
              <label htmlFor="lastPrice">Last Price:</label>
              <input
                type="number"
                min={0}
                className="form-control"
                id="lastPrice"
                value={lastPrice}
                onChange={(e) => setLastPrice(e.target.value)}
              />
            </div>
            <div className="col-md-1">
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
            <div className="col-md-1">
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
            <div className="col-md-1">
              <label htmlFor="profit">PNL:</label>
              <input
                placeholder="default : 1"
                type="number"
                className="form-control"
                id="profit"
                value={profit}
                onChange={(e) => setProfit(e.target.value)}
              />
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
              <th>Last Price</th>
              <th>Kaldıraç</th>
              <th>Yön</th>
              <th>Instant Profit</th>
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
          id="profit"
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
        <button onClick={clearTable} id="clearbtn" className="btn btn-outline-danger">
          Clear
        </button>
      </div>
    </div>
  );
}

export default TransactionRecord;
