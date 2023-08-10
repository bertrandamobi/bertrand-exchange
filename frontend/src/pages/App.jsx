import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MarketChart from '../components/MarketChart';
import OrderPanel from '../components/OrderPanel';
import { useDemoMarket } from '../hooks/useDemoMarket';
import { placeDemoOrder, setSelected } from '../store/store';
import { rsi, sma } from '../utils/indicators';

function GithubIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
      <path d='M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.37-1.34-1.74-1.34-1.74-1.1-.73.08-.72.08-.72 1.2.08 1.84 1.2 1.84 1.2 1.08 1.8 2.84 1.28 3.53.98.1-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.84 0-1.3.48-2.36 1.25-3.2-.12-.3-.54-1.52.12-3.16 0 0 1.02-.32 3.35 1.22a11.8 11.8 0 0 1 6.1 0c2.33-1.54 3.35-1.22 3.35-1.22.66 1.64.24 2.86.12 3.16.78.84 1.25 1.9 1.25 3.2 0 4.54-2.81 5.54-5.49 5.84.44.37.82 1.08.82 2.2v3.26c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z'/>
    </svg>
  );
}

export default function App() {
  useDemoMarket();
  const [theme, setTheme] = useState('dark');
  const dispatch = useDispatch();
  const { prices, candles, selected, news, portfolio, trades, cash } = useSelector((s) => s.simulation);
  const selectedSeries = candles[selected] || [];
  const signalRsi = rsi(selectedSeries).toFixed(1);
  const signalSma = sma(selectedSeries, 20)?.toFixed(2) ?? '-';
  const portfolioValue = useMemo(() => portfolio.reduce((sum, p) => sum + (prices[p.symbol] || 0) * p.qty, 0), [portfolio, prices]);

  return <div className='layout' data-theme={theme}>
    <header className='hero'><h1>Bertrand Xchange</h1><p>An AI-powered trader, showcasing real-time market trends and AI-driven insights</p><div><button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</button><button className='secondary'>Sign In</button><button className='secondary'>Sign Up</button></div></header>
    <main className='grid'>
      <section className='panel xl'>
        <div className='ticker'>{Object.entries(prices).map(([s, p]) => <button key={s} className={selected===s?'chip active':'chip'} onClick={() => dispatch(setSelected(s))}>{s} ${p}</button>)}</div>
        <MarketChart symbol={selected} candles={selectedSeries} />
      </section>
      <section className='panel'>
        <OrderPanel symbol={selected} onSubmit={(order)=>dispatch(placeDemoOrder({ ...order, price: prices[selected], ts: new Date().toISOString() }))} />
        <h3>Indicators</h3><p>RSI: {signalRsi}</p><p>SMA(20): {signalSma}</p><p>MACD: 1.42 (demo)</p>
      </section>
      <section className='panel'>
        <h3>Account Overview</h3><p>Cash: ${cash.toLocaleString()}</p><p>Portfolio: ${portfolioValue.toFixed(2)}</p>
        <h4>Recent Trades</h4>{trades.slice(0,5).map((t,i)=><div key={i} className='news'>{t.side.toUpperCase()} {t.qty} {t.symbol} @ ${t.price}</div>)}
        <h4>AI News Feed</h4>{news.map((n,i)=><div key={i} className='news'>{n.headline}</div>)}
      </section>
    </main>
    <footer className='footer'>
      <p>© 2022 Bertrand Amobi.</p>
      <p>For demonstration purposes only.</p>
      <a href='https://github.com/vetygrenaz/bertrand-exchange' target='_blank' rel='noreferrer'><GithubIcon /> View Source Code</a>
    </footer>
  </div>;
}
