import { useState } from 'react';

export default function OrderPanel({ symbol, onSubmit }) {
  const [qty, setQty] = useState('1');
  const [type, setType] = useState('market');
  return (
    <div className='order-panel'>
      <h3>Smart Order Entry</h3>
      <select value={type} onChange={(e) => setType(e.target.value)}><option value='market'>Market</option><option value='limit'>Limit</option><option value='stop'>Stop-loss</option></select>
      <input value={symbol} readOnly />
      <input value={qty} onChange={(e) => setQty(e.target.value)} placeholder='Quantity'/>
      <div className='actions'>
        <button onClick={() => onSubmit({ side: 'buy', type, qty: Number(qty), symbol })}>Buy</button>
        <button className='secondary' onClick={() => onSubmit({ side: 'sell', type, qty: Number(qty), symbol })}>Sell</button>
      </div>
    </div>
  );
}
