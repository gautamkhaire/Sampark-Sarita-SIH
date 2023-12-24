"use client";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import Link from "next/link";

export default function BarChart({ statesResolutions }) {
  const chartRef = useRef(null);

  const states = Array.from(statesResolutions.keys());
  const resolutions = Array.from(statesResolutions.values());

  // const successfulResolutions = [];
  // resolutions.forEach((element) => {
  //   const value = element["Successful Resolution"];
  //   successfulResolutions.push(value);
  // });

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      const label = states;
      const data = resolutions;
      let delayed;

      const newChart = new Chart(context, {
        type: "bar",
        data: {
          labels: label,
          datasets: [
            {
              label: "States of India",
              data: data,
              backgroundColor: [
                "rgb(255, 99, 132, 0.5)",
                "rgb(255, 204, 0,0.5)",
                "rgb(0, 102, 255,0.5)",
                "rgb(153, 0, 255,0.5)",
                "rgb(255, 102, 0,0.5)",
                "rgb(153, 255, 102,0.5)",
              ],
              borderRadius: 10,
            },
          ],
        },
        options: {
          animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (
                context.type === "data" &&
                context.mode === "default" &&
                !delayed
              ) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
              }
              return delay;
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Questions vs Frequency",
            },
          },
          layout: {
            padding: 40,
          },
          // responsive: true
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        },
      });

      chartRef.current.chart = newChart;
    }
  }, []);

  function handleDownload() {
    if (chartRef.current) {
      const file = chartRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = file;
      link.download = "barChart.png";
      link.click();
    }
  }
  return (
    <div className="flex flex-col items-end">
      <canvas ref={chartRef} width={700} height={600} />
      <div className="flex flex-row justify-evenly items-center space-x-4 -mt-8 mb-2">
        <div className=" bg-blue-500 p-3  rounded-lg text-white">
          <Link href="/agents" target="_blank">Agents Details</Link>
        </div>
        <button
          onClick={handleDownload}
          className=" bg-blue-500 p-3 rounded-lg text-white"
        >
          Download Chart
        </button>
      </div>
    </div>
  );
}
