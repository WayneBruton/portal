<template>
  <q-page>
    <std-header />
    <br /><br />

    <div class="row">
      <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-1"></div>
      <div class="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
        <q-card
          class="my-card text-white"
          style="height: 100%; border: 1px solid #e7d4a0"
        >
          <q-card-section>
            <div
              class="row"
              style="text-align: center; font-size: 120%; font-wight: bold"
            >
              Investment Summary: {{ summary_data }}
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="row">
              <div class="col-12 summaryDataChild col-sm-12 col-md-4 col-lg-4 col-xl-4">
                Capital: {{ capital }}
              </div>
              <div class="col-12 summaryDataChild col-sm-12 col-md-4 col-lg-4 col-xl-4">
                Interest: {{ interest }}
              </div>
              <div class="col-12 summaryDataChild col-sm-12 col-md-4 col-lg-4 col-xl-4">
                Total: {{ total }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-1"></div>
    </div>
    <br />
    <div class="row">
      <div class="col-0 col-sm-2 col-md-2 col-lg-2 col-xl-2"></div>
      <div class="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8">
        <q-btn class="showButtons" color="grey" @click="backToDashoard"
          >Back to Dashboard</q-btn
        >
        <q-btn color="grey" class="showButtons" @click="viewInvestmentsList"
          >View Full Investment List</q-btn
        >
        <!-- v-if="closed_investments.length > 0" -->
        <q-btn
          :disable="!showGraph"
          color="grey"
          class="showButtons"
          size="s"
          @click="scrollToSection('section1')"
        >
          Investment Graph
          <q-icon
            name="insert_chart_outlined"
            color="light-green-10"
            size="m"
            style="margin-left: 20px; text-align: right"
          />
          <q-tooltip anchor="center right" self="center left">Show Chart</q-tooltip>
        </q-btn>
      </div>
      <div class="col-0 col-sm-2 col-md-2 col-lg-2 col-xl-2"></div>
    </div>
    <br />
    <div class="row">
      <div class="col-1"></div>
      <div class="col">
        <!-- <q-card class="my-card text-white" style="margin: 10px 10px; padding: 10px"> -->
        <!-- <q-card-section class="q-pt-none"> -->
        <q-card
          class="my-card text-white"
          v-for="(dev, index) in development_data"
          :key="index"
          style="
            margin: 10px 0px;
            border: 1px solid #e7d4a0;
            margin-left: 10px;
            margin-right: 10px;
          "
        >
          <br />
          <!-- <q-card-section> -->
          <div style="font-size: 120%; font-wight: bold; margin-left: 25px">
            Account: {{ dev.investment_name }}
          </div>
          <!-- </q-card-section> -->
          <q-card-section class="q-pt-none">
            <div class="row">
              <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-first">
                <div class="summaryDetail">Investment Date</div>
              </div>
              <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-second">
                <div class="summaryDetail">Capital Amount</div>
              </div>
              <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-third">
                <div class="summaryDetail">Interest</div>
              </div>
              <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-fourth">
                <div class="summaryDetail">Balance</div>
              </div>

              <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-fifth">
                <div class="summaryDetail">
                  {{ dev.deposit_date }}
                </div>
              </div>
              <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-sixth">
                <div class="summaryDetail">
                  {{ dev.capital_this }}
                </div>
              </div>
              <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-seventh">
                <div class="summaryDetail">
                  {{ dev.interest }}
                </div>
              </div>
              <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-eighth">
                <div class="summaryDetail">
                  {{ dev.current_value }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <!-- </q-card-section> -->
        <!-- </q-card> -->
      </div>
      <div class="col-1"></div>
    </div>
    <div class="row" v-if="closed_investments.length > 0">
      <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-1"></div>
      <div class="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 q-pa-md q-gutter-md">
        <!-- <div>
          <BarChart id="section1" :chartData="display_data" :options="options" />
        </div> -->

        <div>
          <GraphInvestments :display_data="display_data" v-if="showGraph" />
        </div>
        <div>
          <GraphInvestmentsA
            id="section1"
            :display_data="display_dataA"
            v-if="showGraph && store.display_dataA.labels.length > 0"
          />
        </div>
        <div>
          <GraphInvestmentsB
            id="section1"
            :display_data="display_dataB"
            v-if="showGraph && store.display_dataB.labels.length > 0"
          />
        </div>
        <div>
          <GraphInvestmentsC
            id="section1"
            :display_data="display_dataC"
            v-if="showGraph && store.display_dataC.labels.length > 0"
          />
        </div>
        <br />
        <hr id="section1" />
        <div>
          <GraphInvestmentsSummary
            :display_data="display_data2"
            v-if="showSummaryGraph"
          />
        </div>
      </div>

      <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-1"></div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import nodeService from "../services/nodeService";
import pythonService from "../services/pythonService";
import { useUserStore } from "../stores/userStore";
import { useRouter, useRoute } from "vue-router";
import stdHeader from "../components/StdHeader.vue";
import GraphInvestments from "../components/GraphInvestments.vue";
import GraphInvestmentsA from "../components/GraphInvestmentsA.vue";
import GraphInvestmentsB from "../components/GraphInvestmentsB.vue";
import GraphInvestmentsC from "../components/GraphInvestmentsC.vue";
import GraphInvestmentsSummary from "../components/GraphInvestmentsSummary.vue";
import verifyUser from "src/helperFiles/verifyUserToken";
import dayjs from "dayjs";
import axios from "axios";
// import { BarChart } from "vue-chart-3";
// import { Chart, registerables } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// Chart.register(ChartDataLabels);
// Chart.register(...registerables);

verifyUser();

const $q = useQuasar();
const store = useUserStore();
const router = useRouter();
const route = useRoute();

store.display_data = {};
store.summary_data = "";

const summary_data = ref([]);

const development_data = ref([]);

const data_from_db = ref([]);

const chart_data = ref([]);

const graph_data = ref([]);

const display_data = ref({
  labels: [],
  datasets: [
    {
      label: "Ave p.a return",
      data: [],
      backgroundColor: ["rgba(255, 26, 104, 0.4)"],
      borderColor: ["rgba(255, 26, 104, 1)"],
      borderWidth: 1,
      datalabels: {
        display: true,
      },
    },
    {
      label: "ROI",
      data: [],
      backgroundColor: ["rgba(54, 162, 235, 0.4)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
      borderWidth: 1,
      datalabels: {
        display: true,
      },
    },
  ],
});

const display_dataA = ref({});
const display_dataB = ref({});
const display_dataC = ref({});

const display_data2 = ref({
  labels: [],
  datasets: [
    {
      label: "Ave p.a return",
      data: [],
      backgroundColor: ["rgba(212,175,55, 0.4)"],
      borderColor: ["rgba(212,175,55, 1)"],
      borderWidth: 1,

      datalabels: {
        display: true,
      },
    },
    {
      label: "ROI",
      data: [],
      backgroundColor: ["rgba(192,192,192, 0.4)"],
      borderColor: ["rgba(192,192,192, 1)"],
      borderWidth: 1,
      datalabels: {
        display: true,
      },
    },
  ],
});

const showGraph = ref(false);
const showSummaryGraph = ref(false);

const get_chart_info = async () => {
  store.display_data = JSON.parse(JSON.stringify(display_data.value));
  store.display_dataA = JSON.parse(JSON.stringify(display_data.value));
  store.display_dataB = JSON.parse(JSON.stringify(display_data.value));
  store.display_dataC = JSON.parse(JSON.stringify(display_data.value));
  store.summary_data = "";

  if (closed_investments.value.length === 0) {
    return;
  }
  let data = {
    chartData: closed_investments.value,
  };

  await pythonService
    .getChartData(data)
    .then((response) => {
      chart_data.value = response.data.final_chart_data;
      // sort by investment_number
      chart_data.value.sort((a, b) => {
        return a.investment_number - b.investment_number;
      });

      let ave_return = (
        chart_data.value.reduce((acc, el) => {
          acc = acc + el.annualised_interest_rate;
          return acc;
        }, 0) / chart_data.value.length
      ).toFixed(1);

      let ave_roi = (
        chart_data.value.reduce((acc, el) => {
          acc = acc + el.return_on_investment;
          return acc;
        }, 0) / chart_data.value.length
      ).toFixed(1);

      // options.value.plugins.title.text = `Investment Summary - ${summary_data.value}`;
      store.summary_data = summary_data.value;
      display_data.value.labels = [];
      display_data.value.datasets.forEach((el) => {
        el.data = [];
      });
      display_data2.value.labels = [];
      display_data2.value.datasets.forEach((el) => {
        el.data = [];
      });

      chart_data.value.forEach((el) => {
        display_data.value.labels.push(
          `${el.opportunity_code} - Inv No: ${el.investment_number}`
        );
        display_data.value.datasets[0].data.push(el.annualised_interest_rate);

        display_data.value.datasets[1].data.push(el.return_on_investment);
      });

      if (chart_data.value.length > 1) {
        display_data2.value.labels.push("Average");
        display_data2.value.datasets[0].data.push(ave_return);
        display_data2.value.datasets[1].data.push(ave_roi);
        store.display_data2 = display_data2.value;
        showSummaryGraph.value = true;
      } else {
        showSummaryGraph.value = false;
      }

      let endNumber = divideArrayLengths(chart_data.value.length);

      // Loop through end number and make weach number be itself plus the previous number, the first number is itself, the swecond number is the first number plus itself, the third number is the second number plus itself etc
      let newNumber = [];
      endNumber.forEach((el, index) => {
        if (index === 0) {
          newNumber.push(el);
        } else {
          newNumber.push(el + newNumber[index - 1]);
        }
      });

      endNumber = newNumber;

      if (display_data.value.labels.length <= 10) {
        store.display_data = JSON.parse(JSON.stringify(display_data.value));
      } else if (endNumber.length == 2) {
        store.display_data = JSON.parse(JSON.stringify(display_data.value));
        store.display_dataA = JSON.parse(JSON.stringify(display_data.value));
      } else if (endNumber.length == 3) {
        store.display_data = JSON.parse(JSON.stringify(display_data.value));
        // store.display_data = JSON.parse(JSON.stringify(display_data.value));
        store.display_dataA = JSON.parse(JSON.stringify(display_data.value));
        store.display_dataB = JSON.parse(JSON.stringify(display_data.value));
      } else if (endNumber.length > 3) {
        store.display_data = JSON.parse(JSON.stringify(display_data.value));
        store.display_dataA = JSON.parse(JSON.stringify(display_data.value));
        store.display_dataB = JSON.parse(JSON.stringify(display_data.value));
        store.display_dataC = JSON.parse(JSON.stringify(display_data.value));
      }

      endNumber.forEach((el, index, arr) => {
        if (index === 0) {
          store.display_data.labels = store.display_data.labels.slice(0, el);
          store.display_data.datasets[0].data = store.display_data.datasets[0].data.slice(
            0,
            el
          );
          store.display_data.datasets[1].data = store.display_data.datasets[1].data.slice(
            0,
            el
          );
        } else if (index === 1 && arr.length > 1) {
          store.display_dataA.labels = store.display_dataA.labels.slice(arr[0], el);

          store.display_dataA.datasets[0].data = store.display_dataA.datasets[0].data.slice(
            arr[0],
            el
          );
          store.display_dataA.datasets[1].data = store.display_dataA.datasets[1].data.slice(
            arr[0],
            el
          );
        } else if (index === 2 && arr.length > 2) {
          store.display_dataB.labels = store.display_dataB.labels.slice(arr[1], el);
          store.display_dataB.datasets[0].data = store.display_dataB.datasets[0].data.slice(
            arr[1],
            el
          );
          store.display_dataB.datasets[1].data = store.display_dataB.datasets[1].data.slice(
            arr[1],
            el
          );
        } else if (index === 3 && arr.length >= 3) {
          console.log(index);
          store.display_dataC.labels = store.display_dataC.labels.slice(arr[3], 50);
          store.display_dataC.datasets[0].data = store.display_dataC.datasets[0].data.slice(
            arr[3],
            50
          );

          store.display_dataC.datasets[1].data = store.display_dataC.datasets[1].data.slice(
            arr[3],
            50
          );
        }
      });

      showGraph.value = true;
    })
    .catch((error) => {
      console.error(error);
    });
};

const divideArrayLengths = (length) => {
  var numParts = Math.ceil(length / 10);
  var baseSize = Math.floor(length / numParts);
  var remaining = length % numParts;

  var lengths = new Array(numParts).fill(baseSize);
  var remainingElements = remaining;

  for (var i = 0; i < numParts; i++) {
    if (remainingElements > 0) {
      lengths[i]++;
      remainingElements--;
    }
  }

  return lengths;
};

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const convertToString = (factor) => {
  let str = parseFloat(factor).toFixed(2).split("").reverse();
  if (str.length > 12) {
    str.splice(12, 0, " ");
  }
  if (str.length > 9) {
    str.splice(9, 0, " ");
  }
  if (str.length > 6) {
    str.splice(6, 0, " ");
  }
  // if (str.length > 3) {
  //   str.splice(3, 0, ",");
  // }
  str.reverse().unshift("R ");
  str = str.join("");
  return str;
};

const capital = ref(0);
const total = ref(0);
const interest = ref(0);
const investment_name = ref("");
const closed_investments = ref([]);

const backToDashoard = () => {
  router.push(`/admin/useraccounts/${store.investor_acc_number}`);
};

const viewInvestmentsList = () => {
  router.push(
    `/admin/useraccounts/investor/${development_data.value[0].investor_acc_number}`
  );
};

const get_info = async () => {
  try {
    const response = await nodeService.getInvestments(route.params);

    // sort by investor_surname then by investor_name then by investor_acc_number
    response.data.sort((a, b) => {
      if (a.investor_acc_number < b.investor_acc_number) {
        return -1;
      }
      if (a.investor_acc_number > b.investor_acc_number) {
        return 1;
      }
      if (a.opportunity_code < b.opportunity_code) {
        return -1;
      }
      if (a.opportunity_code > b.opportunity_code) {
        return 1;
      }
      if (a.investment_number < b.investment_number) {
        return -1;
      }
      if (a.investment_number > b.investment_number) {
        return 1;
      }
      return 0;
    });

    response.data = response.data.filter((el) => {
      return el.investor_acc_number === route.params.id;
    });

    response.data.forEach((el) => {
      if (el.amount_invested === "CLOSED") {
        closed_investments.value.push(el);
      }
    });

    data_from_db.value = response.data.filter((el) => {
      return el.amount_invested !== "CLOSED";
    });

    // data_from_db.value = response.data;

    if (data_from_db.value.length === 0) {
      summary_data.value = `No Open Investments`;
    } else {
      summary_data.value = data_from_db.value[0].investment_name;
    }

    capital.value = data_from_db.value.reduce((acc, el) => {
      return acc + parseFloat(el.amount_invested);
    }, 0);

    total.value = data_from_db.value.reduce((acc, el) => {
      return acc + parseFloat(el.balance);
    }, 0);

    interest.value = total.value - capital.value;

    capital.value = convertToString(capital.value);
    total.value = convertToString(total.value);
    interest.value = convertToString(interest.value);

    let dev = [];
    data_from_db.value.forEach((el) => {
      dev.push(el.opportunity_code);
    });

    dev = [...new Set(dev)];

    development_data.value = [];

    console.log("dev", dev);

    dev.forEach((el) => {
      let data_filtered = data_from_db.value.filter((el2) => {
        return el2.opportunity_code === el;
      });

      let developmentName = "";
      let block = "";
      let unit = "";

      if (el.length === 6) {
        let length = el.length;
        if (el.substring(0, 2) === "HF") {
          developmentName = "Heron Fields";

          block = `Block ${el.substring(2, 3)}`;

          unit = `Unit ${el.slice(-3)}`;
        } else if (el.substring(0, 2) === "HV") {
          developmentName = "Heron View";
          block = `Block ${el.substring(2, 3)}`;

          unit = `Unit ${el.slice(-3)}`;
        } else if (el.substring(0, 2) === "GW") {
          developmentName = "Goodwood Bulk Refurbishment";
          block = "";
          unit = `Erf ${el.slice(-4)}`;
        }
      } else if (el.substring(0, 1) === "E") {
        developmentName = "Endulini";
        block = `Block ${el.substring(1, 2)}`;

        unit = `Unit ${el.slice(-3)}`;
      }
      // else {
      //   developmentName = "Goodwood Bulk Refurbishment";

      //   block = ``;

      //   unit = `Erf ${el}`;
      // }

      investment_name.value = `${developmentName} - ${block}  ${unit}`;

      let insert = {
        investment_name: `${developmentName} - ${block}  ${unit}`,
        current_value: convertToString(
          data_filtered.reduce((acc, el) => {
            return acc + parseFloat(el.balance);
          }, 0)
        ),
        capital_this: convertToString(
          data_filtered.reduce((acc, el) => {
            return acc + parseFloat(el.amount_invested);
          }, 0)
        ),
        interest: convertToString(
          data_filtered.reduce((acc, el) => {
            return acc + parseFloat(el.balance);
          }, 0) -
            data_filtered.reduce((acc, el) => {
              return acc + parseFloat(el.amount_invested);
            }, 0)
        ),
        investor_acc_number: data_filtered[0].investor_acc_number,
        deposit_date: dayjs(data_filtered[0].deposit_date).format("DD MMM YYYY"),
      };
      development_data.value.push(insert);
      console.log("XZXZX", development_data.value);
    });
  } catch (error) {
    console.error(error);
  }
};

onBeforeMount(() => {
  get_info().then(() => {
    if (closed_investments.value.length > 0) {
      get_chart_info();
    }
  });
});
// get_info();

$q.dark.set(true);
</script>

<style scoped>
.my-card {
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

.summaryDataChild {
  background-color: #cea662;
  border: 1px solid #e4cf95;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  padding: 5px;
}
.summaryDetail {
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  padding: 5px;
  background: #444444;
  margin: 5px 10px;
}
.showButtons {
  margin: 15px 1px;
  width: 30%;
}

@media (max-width: 1023px) {
  .showButtons {
    margin: 5px 5px;
    width: 95%;
    align-content: center;
  }

  .col-first {
    order: 1;
  }
  .col-second {
    order: 3;
  }
  .col-third {
    order: 5;
  }
  .col-fourth {
    order: 7;
  }
  .col-fifth {
    order: 2;
  }
  .col-sixth {
    order: 4;
  }
  .col-seventh {
    order: 6;
  }
  .col-eighth {
    order: 8;
  }
}
</style>
