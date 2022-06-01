import React, { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";
import charging from "./assets/B_witch_charge.png";
import running from "./assets/B_witch_run.png";
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
      let stockObject = JSON.parse(event.data);
      // console.log(stockObject.p, stockObject.s);
      setBinancePriceData([{ symbol: stockObject.s, price: stockObject.p }]);
      // stockPrice.innerHTML = parseFloat(stockObject.p).toFixed(2);
    };
    waitForSocketConnection(ws);
  };

  //4
  const sendCoinbaseMessage = (ws) => {
    // Wait until the state of the socket is not ready and send the message when it is...
    console.log("message sent!!!");
    ws.send(
      JSON.stringify({
        type: "subscribe",
        product_ids: ["BTC-USD"],
        channels: ["ticker"],
      })
    );
  };

  //3 Make the function wait until the connection is made...
  const waitForCoinbaseSocketConnection = (ws) => {
    setTimeout(() => {
      if (ws.readyState === 1) {
        console.log("Coinbase connection is made");
        sendCoinbaseMessage(ws);
      } else {
        console.log("wait for coinbase connection...");
        waitForCoinbaseSocketConnection(ws);
      }
    }, 5); // wait 5 milisecond for the connection...
  };

  //2
  const startCoinbaseWebsocket = () => {
    let ws = new WebSocket("wss://ws-feed.exchange.coinbase.com");
    //every time message arrives on websocket it is handled with onmessage
    ws.onmessage = (event) => {
      // console.log(event);
      let stockObject = JSON.parse(event.data);
      // console.log(stockObject);
      console.log(stockObject.price);
      // console.log(stockObject.changes[0]);
      // console.log(stockObject.p, stockObject.s);
      // setBinancePriceData([{ symbol: stockObject.s, price: stockObject.p }]);
      // stockPrice.innerHTML = parseFloat(stockObject.p).toFixed(2);
    };
    waitForCoinbaseSocketConnection(ws);
  };

  //1
  useEffect(() => {
    // getExchangeInfo();
    // startBinanceWebsocket();
    // startCoinbaseWebsocket();
  }, []);

  const run = () => {
    const blueWitch = document.querySelector(".blue-witch");
    blueWitch.style.backgroundImage = `url(${running})`;
    blueWitch.style.width = "96px";
    blueWitch.style.marginLeft = "26px";
    blueWitch.style.marginBottom = "-40px";
    blueWitch.style.animation = "charge 0.5s steps(7) infinite";
  };

  return (
    <div className="App">
      <div>hello</div>
      {binancePriceData.map((coin) => {
        return <CoinCard key={Math.floor(Math.random() * 10000)} coin={coin} />;
      })}
      <div
        className="blue-witch"
        style={{ backgroundImage: "url(" + charging + ")" }}
      ></div>
      <div className="run" onClick={run}>
        run
      </div>
    </div>
  );
}

export default App;
