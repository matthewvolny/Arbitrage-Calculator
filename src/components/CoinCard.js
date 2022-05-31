import React, { useEffect, useState } from "react";

export default function CoinCard(props) {
  const { symbol, price } = props.coin;
  const [numCoinsPurchased, setNumCoinsPurchased] = useState();
  const [coinFees, setCoinFees] = useState();
  const [amountPurchased, setAmountPurchased] = useState(100);

  useEffect(() => {
    setNumCoinsPurchased(amountPurchased / price);
    setCoinFees({
      maker: amountPurchased * 0.001,
      taker: amountPurchased * 0.001,
      additional: amountPurchased * 0.005,
      withdrawal: 0.0005,
    });
  }, [price]);

  return (
    <div>
      <div>Binance Exchange Data</div>
      <div>{symbol}</div>
      <div>{price}</div>
      <div>Fees for $100USD</div>
      <div>{numCoinsPurchased}</div>
      <div>Purchase Fee Total</div>
      <div>{coinFees.taker + coinFees.additional}</div>
      <div>Withdrawal Fee</div>
      <div>{coinFees.withdrawal}</div>
      <div>Total Fees</div>
    </div>
  );
}
