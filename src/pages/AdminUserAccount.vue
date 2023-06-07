<template>
  <q-page>
    <std-header />
    <br />
    <MarqueeText
      duration="35"
      style="margin-bottom: 15px"
      :paused="paused"
      v-if="stock_market.length > 0"
      :onmouseover="mouseoverTicker"
      :onmouseout="mouseoutTicker"
    >
      <q-chip
        :square="square"
        :dense="dense"
        v-for="(item, index) in store.stock_market"
        :key="index"
        :style="getItemStyle(item.color)"
      >
        {{ item.Description }}: {{ item.price }}
        <q-icon size="md" :name="item.icon" :color="item.icon_color" v-if="item.icon" />
      </q-chip>
    </MarqueeText>
    <MarqueeText duration="10" style="margin-bottom: 15px; width: 100vw" v-else>
      <q-chip :square="square" :dense="dense" style="background: #e7d4a0; color: black">
        Market info coming!
      </q-chip>
      <q-chip :square="square" :dense="dense" style="background: #b47b1d; color: white">
        Approx 10 Seconds!
      </q-chip>
      <q-chip :square="square" :dense="dense" style="background: #e7d4a0; color: black">
        Market info coming!
      </q-chip>
      <q-chip :square="square" :dense="dense" style="background: #b47b1d; color: white">
        Approx 10 Seconds!
      </q-chip>
      <q-chip :square="square" :dense="dense" style="background: #e7d4a0; color: black">
        Market info coming!
      </q-chip>
      <q-chip :square="square" :dense="dense" style="background: #b47b1d; color: white">
        Approx 10 Seconds!
      </q-chip>
    </MarqueeText>

    <div class="row">
      <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-1"></div>
      <div class="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
        <q-card
          class="my-card text-white"
          style="height: 100%; border: 1px solid #e7d4a0"
        >
          <q-card-section>
            <div class="text-h6" style="text-align: center">Dashboard</div>
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
    <br /><br />
    <div class="row">
      <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-1"></div>
      <div class="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 summaryDataMain">
        <q-card
          class="my-card text-white my-card-header"
          style="height: 100%; width: 100%; border: 1px solid #e7d4a0"
        >
          <q-card-section>
            <div
              class="row text-white my-card myCardDetail"
              v-for="(dev, index) in development_data"
              :key="index"
            >
              <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 summaryDataMain">
                <div>
                  <div style="font-size: 120%; font-wight: bold">
                    Account: {{ dev.investor_acc_number }}
                  </div>
                  <div style="font-size: 120%; font-wight: bold">
                    {{ dev.investment_name }}
                  </div>
                </div>
              </div>

              <div class="col-1 col-sm-0 col-md-1 col-lg-1 col-xl-1"></div>
              <div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 summaryDataMain">
                <q-btn
                  v-if="!only_closed"
                  class="summaryDataBtns"
                  no-caps
                  style="
                    border: 1px solid white;
                    background: radial-gradient(circle, #dec57c 0%, #ba852a 100%);
                    color: white;
                    height: 20px;
                    width: 250px;
                  "
                  @click="getCurrentInvestorSummary(dev.investor_acc_number)"
                  >Current Investment Summary</q-btn
                >
                <q-btn
                  class="summaryDataBtns"
                  no-caps
                  style="background: lightgrey; color: black; width: 250px; height: 20px"
                  @click="viewInvestmentsList(dev.investor_acc_number)"
                  >Full Investment List</q-btn
                >
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-1"></div>
    </div>
    <div class="row" v-if="showGraph">
      <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-1"></div>
      <!-- v-if="closed_investments.length > 0 && store.display_data !== {}" -->
      <div class="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 q-pa-md q-gutter-md">
        <!-- <div>
          <BarChart id="section1" :chartData="display_data" :options="options" />
        </div> -->

        <div>
          <GraphInvestments id="section1" :display_data="display_data" v-if="showGraph" />
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
        <br v-if="showSummaryGraph" />
        <hr v-if="showSummaryGraph" />
        <div>
          <GraphInvestmentsSummary
            id="section1"
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
import { ref, onBeforeMount, onMounted, computed, watchEffect } from "vue";
import { useQuasar } from "quasar";
import nodeService from "../services/nodeService";
import pythonService from "../services/pythonService";
import { useUserStore } from "../stores/userStore";
import { useRouter, useRoute } from "vue-router";
import stdHeader from "../components/StdHeader.vue";
import verifyUser from "src/helperFiles/verifyUserToken";
import MarqueeText from "vue-marquee-text-component";
import axios from "axios";
import GraphInvestments from "../components/GraphInvestments.vue";
import GraphInvestmentsA from "../components/GraphInvestmentsA.vue";
import GraphInvestmentsB from "../components/GraphInvestmentsB.vue";
import GraphInvestmentsC from "../components/GraphInvestmentsC.vue";
import GraphInvestmentsSummary from "../components/GraphInvestmentsSummary.vue";

verifyUser();

const $q = useQuasar();
const store = useUserStore();
const router = useRouter();
const route = useRoute();

store.summary_data = "";
store.display_data = {};

const url = ref(
  process.env.DEV ? "http://localhost:3000" : "https://opportunity.eu-4.evennode.com"
);

const get_stock_data = async () => {
  try {
    // stock_market.value = [];
    stock_market.value = store.stock_market;

    const response = await pythonService
      .getStockMarketData()
      .then((response) => {
        response.data.stock_market.unshift({
          Description: "Market Figures courtesy of Yahoo Finance",
          change: null,
          color: "grey",
          icon: "",
          icon_color: "",
          index: "",
          price: "",
        });
        stock_market.value = [];
        stock_market.value = response.data.stock_market;
        store.stock_market = response.data.stock_market;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

const paused = ref(false);

const mouseoverTicker = () => {
  paused.value = true;
};

const mouseoutTicker = () => {
  paused.value = false;
};

onBeforeMount(() => {
  store.current_investment_viewed = "";
  store.files = [];
  store.loanAgreements = [];

  // get_stock_data();
});

const getItemStyle = (color) => {
  let style = computed(() => {
    return {
      backgroundColor: color,
      color: "white",
      marginBottom: "10px",
    };
  });
  return style.value;
};

// watchEfect stock_market.value and update styles accordingly

// get_stock_data every 15 minutes - TURN ON AFTER UPGRADE
setInterval(() => {
  get_stock_data();
}, 1000 * 60 * 15);

const square = ref(true);
const dense = ref(false);
const stock_market = ref([]);

const summary_data = ref([]);

const development_data = ref([]);

const data_from_db = ref([]);

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

const getInvestorDocs = async () => {
  try {
    const response = await nodeService.getInvestorDocs(route.params);

    store.files = [];
    store.loanAgreements = [];

    let files = [];
    let loanAgreements = [];

    // remove duplicates in response.data
    let uniqueArr = response.data.filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.key === obj.key && t.value === obj.value)
    );

    uniqueArr.forEach((el) => {
      el.value = `${url.value}/${el.value}`;
      if (el.key === "loanAgreement") {
        loanAgreements.push(el);
      } else {
        files.push(el);
      }
    });

    store.files = files;
    store.loanAgreements = loanAgreements;
  } catch (error) {
    console.error(error);
  }
};

const closed_investments = ref([]);

const only_closed = ref(false);

onBeforeMount(() => {
  getInvestorDocs();
});

const get_info = async () => {
  try {
    const response = await nodeService.getInvestments(route.params);

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

    closed_investments.value = response.data.filter((el) => {
      return el.amount_invested === "CLOSED";
    });

    let only_closed = response.data.filter((el) => {
      return el.amount_invested !== "CLOSED";
    });

    if (only_closed.length === 0) {
      only_closed.value = true;
    } else {
      only_closed.value = false;
    }

    // data_from_db.value = response.data.filter((el) => {
    //   return el.amount_invested == "CLOSED";
    // });

    data_from_db.value = response.data;

    capital.value = data_from_db.value.reduce((acc, el) => {
      if (el.amount_invested === "CLOSED") {
        acc = acc;
      } else {
        acc = acc + parseFloat(el.amount_invested);
      }
      return acc;
    }, 0);

    total.value = data_from_db.value.reduce((acc, el) => {
      if (el.amount_invested === "CLOSED") {
        acc = acc;
      } else {
        acc = acc + parseFloat(el.balance);
      }
      return acc;
    }, 0);

    interest.value = total.value - capital.value;

    capital.value = convertToString(capital.value);
    total.value = convertToString(total.value);
    interest.value = convertToString(interest.value);

    let dev = [];

    data_from_db.value.forEach((el) => {
      dev.push(el.investor_acc_number);
    });

    dev = [...new Set(dev)];

    development_data.value = [];

    dev.forEach((el) => {
      let data_filtered = data_from_db.value.filter((el2) => {
        return el2.investor_acc_number === el;
      });
      let insert = {
        investor_acc_number: el,
        investment_name: data_filtered[0].investment_name,
      };
      development_data.value.push(insert);
    });
  } catch (error) {
    console.error(error);
  }
};

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
      // barPercentage: 0.5,
      // categoryPercentage: 1.0,
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
      // barPercentage: 0.5,
      // categoryPercentage: 1.0,
      datalabels: {
        display: true,
      },
    },
  ],
});

const chart_data = ref([]);

const showGraph = ref(false);
const showSummaryGraph = ref(false);

const get_chart_info = async () => {
  store.display_data = JSON.parse(JSON.stringify(display_data.value));
  store.display_dataA = JSON.parse(JSON.stringify(display_data.value));
  store.display_dataB = JSON.parse(JSON.stringify(display_data.value));
  store.display_dataC = JSON.parse(JSON.stringify(display_data.value));
  store.summary_data = "";
  if (development_data.value.length > 1) {
    return;
  }
  if (closed_investments.value.length === 0) {
    return;
  }
  let data = {
    chartData: closed_investments.value,
  };

  let response = await pythonService
    .getChartData(data)
    .then((response) => {
      chart_data.value = response.data.final_chart_data;
      // console.log(chart_data.value);
      // keep only the first 12 records

      // sort by investment_number
      chart_data.value.sort((a, b) => {
        if (a.investment_number < b.investment_number) {
          return -1;
        }
        if (a.investment_number > b.investment_number) {
          return 1;
        }
        return 0;
      });

      // chart_data.value = chart_data.value.slice(0, 21);
      // console.log(chart_data.value);
      // only keep the first 12 records
      // chart_data.value = chart_data.value.slice(0, 9);

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

      display_data.value.labels = [];
      display_data.value.datasets.forEach((el) => {
        el.data = [];
      });
      display_data2.value.labels = [];
      display_data2.value.datasets.forEach((el) => {
        el.data = [];
      });

      chart_data.value.forEach((el, index, arr) => {
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

const getCurrentInvestorSummary = (e) => {
  store.current_investment_viewed = e;
  router.push({
    name: "adminuseraccountsdetail",
    params: {
      id: e,
    },
  });
};

onBeforeMount(() => {
  get_info().then(() => {
    get_chart_info().then(() => {
      get_stock_data();
    });
  });
});

const viewInvestmentsList = (e) => {
  store.current_investment_viewed = e;
  router.push(`/admin/useraccounts/investor/${e}`);
};

$q.dark.set(true);
</script>

<style scoped>
.my-card {
  border-radius: 10px;
  /* border: 1px solid #3c3c3c; */
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

.my-card-header {
  margin: 10px 10px;
  padding: 10px;
  border: 1px solid #3c3c3c;
}

.myCardDetail {
  margin-top: 5px;
}

.summaryDataMain {
  /* text-align: center;
  width: 95vw;
  margin: 0 0; */
}

.summaryDataBtns {
  margin: 5px 2px;
  margin-top: 20px;
}

.summaryDataChild {
  background-color: #cea662;
  /* background-color: #d6b674; */
  /* border: 1px solid #ba852a; */
  border: 1px solid #e4cf95;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  padding: 5px;
}

@media (max-width: 1023px) {
  .summaryDataMain {
    text-align: center;
    width: 95vw;
    margin: 0 0;
  }

  .myCardDetail {
    margin: 10px 2px;
  }

  .summaryDataBtns {
    margin: 8px 2px;
  }
}
</style>
