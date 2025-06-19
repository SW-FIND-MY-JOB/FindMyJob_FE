import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

// 정규분포 PDF 함수
function normalPdf(x, mean, sd) {
  const coeff = 1 / (sd * Math.sqrt(2 * Math.PI));
  const exponent = -((x - mean) ** 2) / (2 * sd ** 2);
  return coeff * Math.exp(exponent);
}

// 평균 & 표준편차 추정
function estimateMeanAndStd(bins, counts) {
  let total = 0;
  let weightedSum = 0;

  bins.forEach((range, i) => {
    const [min, max] = range.split('-').map(Number);
    const mid = (min + max) / 2;
    weightedSum += mid * counts[i];
    total += counts[i];
  });

  const mean = weightedSum / total;

  let varianceSum = 0;
  bins.forEach((range, i) => {
    const [min, max] = range.split('-').map(Number);
    const mid = (min + max) / 2;
    varianceSum += ((mid - mean) ** 2) * counts[i];
  });

  const stdDev = Math.sqrt(varianceSum / total);

  return { mean, stdDev };
}


export default function HistogramToNormalChart({ score, percent, bins, counts }) {
  if (!bins || !counts || bins.length === 0 || counts.length === 0) {
    return <p>점수 분포를 불러오는 중입니다...</p>;
  }

  // 평균과 표준편차 추정
  const { mean, stdDev } = estimateMeanAndStd(bins, counts);

  // 정규분포 데이터 생성
  const xValues = Array.from({ length: 101 }, (_, i) => i * 10); // 0~1000
  const yValues = xValues.map(x => normalPdf(x, mean, stdDev));
  const scoreY = normalPdf(score, mean, stdDev);

  const data = {
    labels: xValues,
    datasets: [
      {
        label: '추정 정규분포',
        data: yValues,
        borderColor: '#4977eb',
        backgroundColor: 'rgba(73,119,235,0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        order: 1,
      },
      {
        label: '내 점수',
        data: [{ x: score, y: scoreY }],
        type: 'scatter',
        borderColor: '#ff9500',
        backgroundColor: '#ff9500',
        pointRadius: 6,
        pointHoverRadius: 8,
        showLine: false,
        order: 2,
      },
    ],
  };

  const options = {
    layout: {
      padding: {
        top: 20,
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        min: 0,
        max: 1000,
        ticks: { stepSize: 100 },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      annotation: {
        annotations: {
          myScoreRange: {
            type: 'box',
            xMin: score - 20,
            xMax: score + 20,
            yMin: 0,
            yMax: scoreY,
            backgroundColor: 'rgba(255, 149, 0, 0.08)',
            borderWidth: 0,
          }
        }
      },
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => {
            if (ctx.dataset.label === '내 점수') return `내 점수: ${score}`;
            return undefined;
          },
        },
      }
    },
  };

  const percentLabelPlugin = {
    id: 'percentLabelPlugin',
    afterDatasetsDraw(chart) {
      const point = chart.getDatasetMeta(1)?.data?.[0]; // 마커는 dataset 1번
  
      if (!point) return;
  
      const { ctx } = chart;
      const { x, y } = point;
      const label = `상위 ${percent}%`;
  
      ctx.save();
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
  
      // 💡 외곽선 효과 추가
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 4;
      ctx.strokeText(label, x, y - 8);
  
      // 💡 본문 텍스트
      ctx.fillStyle = '#ff9500';
      ctx.fillText(label, x, y - 8);
      ctx.restore();
    },
  };

  return (
    <div style={{ width: '100%', height: '250px' }}>
      <Line data={data} options={options} plugins={[percentLabelPlugin]} />
      <p style={{ textAlign: 'center', marginTop: 8, color: '#ff9500' }}>
        🎯 내 점수 <strong>{score}</strong>점은 정규분포상 상위 <strong>{percent}%</strong>입니다.
      </p>
    </div>
  );
}

HistogramToNormalChart.propTypes = {
  score: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  bins: PropTypes.arrayOf(PropTypes.string).isRequired,
  counts: PropTypes.arrayOf(PropTypes.number).isRequired,
};
