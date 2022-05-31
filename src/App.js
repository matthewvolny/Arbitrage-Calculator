import React, { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";
import axios from "axios";

import "./App.css";

function App() {
  const [binancePriceData, setBinancePriceData] = useState([]);

  const getExchangeInfo = async () => {
    try {
      const response = await axios.get(
        " https://api.binance.us/api/v1/exchangeInfo"
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  //4
  const sendMessage = (ws) => {
    // Wait until the state of the socket is not ready and send the message when it is...
    console.log("message sent!!!");
    ws.send(
      JSON.stringify({
        method: "SUBSCRIBE",
        params: ["btcusdt@trade"],
        id: 1,
      })
    );
  };

  //3 Make the function wait until the connection is made...
  const waitForSocketConnection = (ws) => {
    setTimeout(() => {
      if (ws.readyState === 1) {
        console.log("Connection is made");
        sendMessage(ws);
      } else {
        console.log("wait for connection...");
        waitForSocketConnection(ws);
      }
    }, 5); // wait 5 milisecond for the connection...
  };

  //2
  const startBinanceWebsocket = () => {
    let ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");
    //every time message arrives on websocket it is handled with onmessage
    ws.onmessage = (event) => {
      console.log(event);
      let stockObject = JSON.parse(event.data);
      console.log(stockObject.p, stockObject.s);
      setBinancePriceData([{ symbol: stockObject.s, price: stockObject.p }]);
      // stockPrice.innerHTML = parseFloat(stockObject.p).toFixed(2);
    };
    waitForSocketConnection(ws);
  };

  //1
  useEffect(() => {
    getExchangeInfo();
    startBinanceWebsocket();
    startCoinbaseWebsocket();
  }, []);

  return (
    <div className="App">
      {binancePriceData.map((coin) => {
        return <CoinCard coin={coin} />;
      })}
    </div>
  );
}

export default App;
