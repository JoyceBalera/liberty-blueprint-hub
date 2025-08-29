import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const KpiChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { 
        beginAtZero: true, 
        grid: { color: 'rgba(255, 255, 255, 0.1)' }, 
        ticks: { color: '#D6D3D1' } 
      },
      x: { 
        grid: { color: 'rgba(255, 255, 255, 0.1)' }, 
        ticks: { color: '#D6D3D1' } 
      }
    },
    plugins: { 
      legend: { 
        labels: { color: '#D6D3D1' } 
      } 
    }
  };

  const data = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{
      label: 'Novas Engenheiras',
      data: [0, 2, 5, 8, 15, 25],
      fill: false,
      borderColor: '#0B9FBD',
      backgroundColor: '#0B9FBD',
      tension: 0.1,
    }]
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-border">
      <h4 className="text-white text-lg font-bold mb-4">Crescimento de Novas Engenheiras</h4>
      <div style={{ position: 'relative', height: '300px', width: '100%' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default KpiChart;