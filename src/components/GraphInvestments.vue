<template>
  <div>
    <BarChart :chartData="display_data" :options="options" />
  </div>
</template>

<script setup>
import { ref, onMounted, defineComponent } from "vue";
import { BarChart } from "vue-chart-3";
import { useUserStore } from "../stores/userStore";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);
Chart.register(...registerables);

const store = useUserStore();

const display_data = ref({});

onMounted(() => {
  display_data.value = store.display_data;
  console.log(display_data.value);
  options.value.plugins.title.text = `Investment Summary - Closed Investments`;
  // if (store.summary_data === "") {
  //   options.value.plugins.title.text = `Investment Summary - Closed Investments`;
  // } else {
  //   options.value.plugins.title.text = `Investment Summary - ${store.summary_data}`;
  // }
  //   options.value.plugins.title.text = `Investment Summary - ${store.summary_data}`;
});

const options = ref({
  scales: {},
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

  scales: {
    x: {
      offset: true,
      title: {
        display: true,
        text: "Investment Details",
        color: "white",
        font: {
          size: 14,
          bold: true,
        },
      },
    },
    y: {
      title: {
        display: true,
        text: "Interest Rate (%)",
        color: "white",
        font: {
          size: 14,
          bold: true,
        },
      },
    },
  },
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
