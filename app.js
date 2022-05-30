//set up websocket
let ws = new WebSocket("wss://stream.binance.com:9443/ws/etheur@trade");
let stockPrice = document.getElementById("stock-price");

let lastPrice = null;

//every time message arrives on websocket it is handled with onmessage
ws.onmessage = (event) => {
  //console.log(event.data);
  let stockObject = JSON.parse(event.data);
  //   console.log(stockObject.p);
  if (lastPrice < stockObject.p) {
    stockPrice.style.color = "green";
  } else {
    stockPrice.style.color = "red";
  }
  lastPrice = stockObject.p;
  stockPrice.innerHTML = parseFloat(stockObject.p).toFixed(2);
};
