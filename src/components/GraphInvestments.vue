<template>
  <div>
    <BarChart :options="options" :chartData="display_data" />
    <!-- <canvas id="myChart"></canvas> -->
  </div>
</template>

<script setup>
import { ref, onMounted, defineComponent } from "vue";
import { useUserStore } from "../stores/userStore";
import { BarChart } from "vue-chart-3";
// const { reactiveProp } = mixins
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
// import Chart from "chart.js/auto";

Chart.register(ChartDataLabels);
Chart.register(...registerables);

const store = useUserStore();

const display_data = ref({});

onMounted(() => {
  display_data.value = store.display_data;

  options.value.plugins.title.text = `Investment Summary - Closed Investments (Oldest to Newest)`;
});

const options = ref({
  scales: {},
  scales: {
    xAxis: {
      offset: true,
      color: "green",
      display: true,

      title: {
        display: true,
        text: "Investment Details",
        color: "white",
        font: {
          size: 14,
          bold: true,
        },
      },
      grid: {
        display: true,
        color: "white",
        drawBorder: true, // Hide the border
        drawOnChartArea: true, // Hide the gridlines within the chart area
        drawTicks: true, // Hide the gridlines intersecting the tick marks
        lineWidth: [0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      ticks: {
        color: "grey",
      },
    },
    yAxis: {
      offset: false,
      position: "left",
      color: "green",
      display: true,

      title: {
        display: true,
        text: "Interest Rate (%)",
        color: "white",
        font: {
          size: 14,
          bold: true,
        },
      },
      grid: {
        display: true,
        color: "white",
        drawBorder: true, // Hide the border
        drawOnChartArea: true, // Hide the gridlines within the chart area
        drawTicks: true, // Hide the gridlines intersecting the tick marks
        lineWidth: [0.5, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      ticks: {
        color: "grey",
      },
    },
  },
  plugins: {
    title: {
      display: true,
      text: "Investment Summary",
      color: "white",
      font: {
        size: 16,
        bold: true,
      },
      padding: {
        top: 10,
        bottom: 60,
      },
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        color: "white",
        font: {
          size: 14,
          bold: true,
        },
      },
    },
    datalabels: {
      display: true,
      anchor: "end",
      align: "end",
      offset: 5,
      color: "white",
      font: {
        size: 11,
      },
      formatter: function (value, context) {
        return value + "%";
      },
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          var label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y + "%";
          }
          return label;
        },
      },
    },
  },
  // Show the x and y axes

  layout: {
    padding: {
      top: 30, // Adjust the top padding value as needed
    },
  },
});

// return { options, graph_display_data };
//   },
// });
</script>
