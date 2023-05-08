<template>
  <q-page>
    <std-header />
    <br /><br />

    <div class="row">
      <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-1"></div>
      <div class="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
        <!-- background: radial-gradient(circle, #e7d4a0 0%, #b47b1d 100%); -->
        <q-card
          class="my-card text-white"
          style="height: 100%; border: 1px solid #e7d4a0"
        >
          <q-card-section>
            <div class="text-h6 row" style="text-align: center">
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
      <div class="col-3 col-sm-4 col-md-4 col-lg-4 col-xl-4"></div>
      <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
        <q-btn color="grey" style="margin: 15px 2px; width: 250px" @click="backToDashoard"
          >Back to Dashboard</q-btn
        >
        <q-btn
          color="grey"
          style="margin: 15px 2px; width: 250px"
          @click="viewInvestmentsList"
          >View Full Investment List</q-btn
        >

        <q-btn
          flat
          style="margin-left: 5px; background: transparant; color: green"
          icon="insert_chart_outlined"
          no-caps
          size="s"
          @click="scrollToSection('section1')"
        >
          <q-tooltip anchor="center right" self="center left">Show Chart</q-tooltip>
        </q-btn>
      </div>
      <div class="col-0 col-sm-4 col-md-4 col-lg-4 col-xl-4"></div>
    </div>
    <br />
    <div class="row">
      <div class="col-1"></div>
      <div class="col">
        <q-card class="my-card text-white" style="margin: 10px 10px; padding: 10px">
          <q-card-section class="q-pt-none">
            <!-- background: #3c3c3c; padding: 10px; -->
            <!-- #e7d4a0 -->
            <q-card
              class="my-card text-white"
              v-for="(dev, index) in development_data"
              :key="index"
              style="margin: 10px 10px; border: 1px solid #3c3c3c"
            >
              <br />
              <q-card-section>
                <div class="text-h6">Account: {{ dev.investment_name }}</div>
              </q-card-section>
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
          </q-card-section>
        </q-card>
      </div>
      <div class="col-1"></div>
    </div>
    <div class="row" v-if="development_data.length > 0">
      <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-1"></div>
      <div class="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 q-pa-md q-gutter-md">
        <div>
          <BarChart id="section1" :chartData="display_data" :options="options" />
          <!-- <bar-chart :data="chartData" :options="chartOptions"></bar-chart> -->
        </div>
        <!-- <div
          style="
            width: 100%;
            height: 200px;
            background: black;
            border: 1px solid white;
            border-radius: 5px;
          "
        >
          <span style="color: white"
            >GRAPH GOES HERE - DEFAULT LAST CLOSED INVESTMENT</span
          >
        </div> -->
      </div>

      <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-1"></div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import nodeService from "../services/nodeService";
import { useUserStore } from "../stores/userStore";
import { useRouter, useRoute } from "vue-router";
import stdHeader from "../components/StdHeader.vue";
import verifyUser from "src/helperFiles/verifyUserToken";
import dayjs from "dayjs";
import axios from "axios";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

verifyUser();

let pythonUrl = ref("");

if (process.env.DEV) {
  pythonUrl.value = "http://localhost:8000";
} else {
  pythonUrl.value = "https://omh-python.herokuapp.com";
}

const $q = useQuasar();
const store = useUserStore();
const router = useRouter();
const route = useRoute();

const summary_data = ref([]);

const development_data = ref([]);

const data_from_db = ref([]);

const chart_data = ref([]);
const display_data = ref({
  labels: [],
  datasets: [
    {
      label: "Annualised Interest Earned",
      data: [],
      backgroundColor: ["rgba(255, 26, 104, 0.4)"],
      borderColor: ["rgba(255, 26, 104, 1)"],
      borderWidth: 1,
    },
    {
      label: "Return on Investment",
      data: [],
      backgroundColor: ["rgba(54, 162, 235, 0.4)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
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
    },
  },
  scales: {
    x: {
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
});

const get_chart_info = async () => {
  let data = {
    chartData: closed_investments.value,
  };

  await axios
    .post(`${pythonUrl.value}/getChartData`, data)
    .then((response) => {
      chart_data.value = response.data.final_chart_data;

      options.value.plugins.title.text = `Investment Summary - ${summary_data.value}`;
      display_data.value.labels = [];
      display_data.value.datasets.forEach((el) => {
        el.data = [];
      });

      chart_data.value.forEach((el) => {
        display_data.value.labels.push(
          `${el.opportunity_code} - Inv No: ${el.investment_number}`
        );
        display_data.value.datasets[0].data.push(el.annualised_interest_rate);

        display_data.value.datasets[1].data.push(el.return_on_investment);
      });
    })
    .catch((error) => {
      console.log(error);
    });
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
    str.splice(12, 0, ",");
  }
  if (str.length > 9) {
    str.splice(9, 0, ",");
  }
  if (str.length > 6) {
    str.splice(6, 0, ",");
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
    // console.log("XXX", response.data);

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

    // console.log("YYY", closed_investments.value);

    response.data = response.data.filter((el) => {
      return el.amount_invested !== "CLOSED";
    });

    data_from_db.value = response.data;

    summary_data.value = data_from_db.value[0].investment_name;

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
        }
      } else {
        developmentName = "Endulini";
        block = `Block ${el.substring(1, 2)}`;

        unit = `Unit ${el.slice(-3)}`;
      }

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
  background-color: #d6b674;
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

@media (max-width: 1023px) {
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
