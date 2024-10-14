import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar elementos necesarios
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Regiones de Chile
const regions = [
  'Arica y Parinacota',
  'Tarapacá',
  'Antofagasta',
  'Atacama',
  'Coquimbo',
  'Valparaíso',
  'Metropolitana',
  'O’Higgins',
  'Maule',
  'Biobío',
  'La Araucanía',
  'Los Ríos',
  'Los Lagos',
  'Aysén',
  'Magallanes y la Antártica Chilena',
];

// Precios ficticios para cada región
const prices = [100, 120, 90, 150, 110, 130, 180, 140, 160, 170, 200, 210, 190, 220, 230];

const RegionPriceChart = () => {
  // Datos para el gráfico
  const chartData = {
    labels: regions, // Etiquetas de las regiones
    datasets: [
      {
        label: 'Precio (en miles de CLP)', // Etiqueta del dataset
        data: prices, // Datos de los precios
        borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo bajo la línea
        fill: true,
        tension: 0.4, // Hace que la línea sea suave
      },
    ],
  };

  // Opciones para el gráfico
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top', // Posición de la leyenda
      },
      title: {
        display: true,
        text: 'Variación de Precios por Región', // Título del gráfico
      },
    },
    scales: {
      y: {
        beginAtZero: true, // El eje Y comienza en 0
        title: {
          display: true,
          text: 'Precio (CLP)', // Etiqueta del eje Y
        },
      },
      x: {
        display: false, // Oculta las etiquetas del eje X
        title: {
          display: false, // También oculta el título del eje X
        },
      },
    },
  };

  return (
    <div className="chart-container" style={{ height: '200px', width: '100%' }}> 
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default RegionPriceChart;
