import React from 'react'

function Emtia() {
  return (
    <div className='mt-4'>
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card" style={{ width: "100%", backgroundColor: "black", color: "white", borderRadius: "6px" }}>
                <div className="card-header" style={{ display: "flex", alignItems: "center" }}>
                  <img src={crypto.image} alt={crypto.name} style={{ width: "25px", height: "25px", marginRight: "10px" }} />
                  <h4>{crypto.symbol}</h4>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Price: ${crypto.current_price}</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card" style={{ width: "100%", backgroundColor: "black", color: "white", borderRadius: "6px" }}>
                <div className="card-header" style={{ display: "flex", alignItems: "center" }}>
                  <img src={crypto.image} alt={crypto.name} style={{ width: "25px", height: "25px", marginRight: "10px" }} />
                  <h4>{crypto.symbol}</h4>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Price: ${crypto.current_price}</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card" style={{ width: "100%", backgroundColor: "black", color: "white", borderRadius: "6px" }}>
                <div className="card-header" style={{ display: "flex", alignItems: "center" }}>
                  <img src={crypto.image} alt={crypto.name} style={{ width: "25px", height: "25px", marginRight: "10px" }} />
                  <h4>{crypto.symbol}</h4>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Price: ${crypto.current_price}</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card" style={{ width: "100%", backgroundColor: "black", color: "white", borderRadius: "6px" }}>
                <div className="card-header" style={{ display: "flex", alignItems: "center" }}>
                  <img src={crypto.image} alt={crypto.name} style={{ width: "25px", height: "25px", marginRight: "10px" }} />
                  <h4>{crypto.symbol}</h4>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Price: ${crypto.current_price}</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card" style={{ width: "100%", backgroundColor: "black", color: "white", borderRadius: "6px" }}>
                <div className="card-header" style={{ display: "flex", alignItems: "center" }}>
                  <img src={crypto.image} alt={crypto.name} style={{ width: "25px", height: "25px", marginRight: "10px" }} />
                  <h4>{crypto.symbol}</h4>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Price: ${crypto.current_price}</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card" style={{ width: "100%", backgroundColor: "black", color: "white", borderRadius: "6px" }}>
                <div className="card-header" style={{ display: "flex", alignItems: "center" }}>
                  <img src={crypto.image} alt={crypto.name} style={{ width: "25px", height: "25px", marginRight: "10px" }} />
                  <h4>{crypto.symbol}</h4>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Price: ${crypto.current_price}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Emtia