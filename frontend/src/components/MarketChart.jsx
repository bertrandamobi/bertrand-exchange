import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export default function MarketChart({ symbol, candles }) {
  const data = {
    labels: candles.map((_, i) => i),
    datasets: [{
      data: candles,
      borderColor: '#f59e0b',
      pointRadius: 0,
      borderWidth: 2,
      tension: 0.25,
      fill: true,
      backgroundColor: 'rgba(250, 204, 21, 0.08)',
    }],
  };
  const options = { animation: { duration: 900, easing: 'easeOutQuart' }, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { grid: { color: '#252525' } } } };
  return <div><h3>{symbol} Live Trend</h3><Line data={data} options={options} /></div>;
}
