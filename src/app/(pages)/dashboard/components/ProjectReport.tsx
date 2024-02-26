// import React, { useCallback, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
const LABELS = ['Takeoff', 'Estimate Project', 'Invoices ', 'Scheduled Project', 'Meeting'];
const VALUES = [25, 32, 36, 16, 18];
const COLORS = ['#001556', "#7F56D9", "#36B37E", "#EF9F28", "#B58905"]



export default function ProjectsReport() {

  return <Doughnut data={{
    labels: LABELS,
    datasets: [
      { data: VALUES, backgroundColor: COLORS, },
    ]
  }}
    options={{
      plugins: {
        legend: {
          display: false
        }
      },
    }}
  />
}