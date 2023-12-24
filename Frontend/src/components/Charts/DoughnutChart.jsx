"use client";
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function DoughnutChart({statusCount}) {
  const status = Array.from(statusCount.keys());
  const count = Array.from(statusCount.values());

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      const newChart = new Chart(context, {
        type: "doughnut",
        data: {
          labels: status,
          datasets: [
            {
              label: "Info",
              data: count,
              backgroundColor: [
                "rgb(75, 192, 192, 0.5)",
                "rgb(255, 159, 64, 0.5)",
                "rgb(255, 205, 86, 0.5)",
                "rgb(255, 99, 132, 0.5)",
              ],
              borderColor: [
                "rgb(75, 192, 192)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(255, 99, 132)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          // responsive: true
        },
      });

      chartRef.current.chart = newChart;
    }
  }, []);
  return (
    <div>
      <canvas ref={chartRef} width={400} height={400}/>
    </div>
  );
}