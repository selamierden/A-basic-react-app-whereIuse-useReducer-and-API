import React, { useState, useReducer } from "react";
import Reducer from "./reducer";

const initialState = {
  data: "",
  loading: false,
  error: ""
}

function App() {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const {data, loading, error} = state;
  
  const fetchDog = () => {
    dispatch({type: "FETCH_START"});

    fetch("https://dog.ceo/api/breeds/image/random")
    .then((res) => res.json())
    .then((res) => {
      dispatch({type: "FETCH_SUCCESS", payload: res.message})
    })
    .catch(() => {
      dispatch({type: "FETCH_ERROR", payload: "Error fetching data !"})
    });
  };

  
  return (
    <div>
      <button onClick={fetchDog} disabled={loading}> Fetch Dog</button>
      {data && (
        <div>
          <img src={data}></img>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}


export default App;