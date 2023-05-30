<template>
  <q-page>
    <std-header />
    <br /><br />

    <div class="row" v-if="screenwidth >= 1023">
      <div class="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
      <div
        class="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10"
        style="background: #121212"
      >
        <q-card
          class="my-card text-white"
          flat
          :bordered="false"
          style="background: #121212"
        >
          <q-card-section>
            <q-table
              class="my-sticky-header-table"
              ref="table"
              title="Investment List"
              :rows="rows"
              :grid="gridMode"
              :columns="columns"
              :filter="filter"
              row-key="name"
              :pagination="initialPagination"
              style="color: lightgrey; font-size: 18px"
              wrap-cells
            >
              <template v-slot:top-right>
                <q-input
                  class="mySearch"
                  :dark="false"
                  borderless
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Search"
                  clearable
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="investor_acc_number" :props="props">
                    {{ props.row.investor_acc_number }}
                  </q-td>
                  <q-td key="opportunity_code" :props="props">
                    {{ props.row.opportunity_code }}
                  </q-td>
                  <q-td key="investment_name" :props="props">
                    {{ props.row.investment_name }}
                  </q-td>
                  <q-td key="investment_number" :props="props">
                    {{ props.row.investment_number }}
                  </q-td>
                  <q-td key="amount_invested" :props="props">
                    <div
                      v-if="props.row.amount_invested === 'CLOSED'"
                      style="
                        background: #f48484;
                        color: #980f5a;
                        padding: 6px;
                        border-radius: 5px;
                        font-weight: bold;
                        margin: 10px 0px;
                        height: 30px;
                      "
                    >
                      {{ props.row.amount_invested }}
                    </div>
                    <div
                      v-else
                      style="
                        background: #ddf7e3;
                        color: green;
                        padding: 6px;
                        border-radius: 5px;
                        font-weight: bold;
                        margin: 10px 0px;
                        height: 30px;
                      "
                    >
                      {{ props.row.amount_invested }}
                    </div>
                  </q-td>
                  <q-td key="balance" :props="props">
                    <div
                      v-if="props.row.amount_invested === 'CLOSED'"
                      style="
                        background: #f48484;
                        color: #980f5a;
                        padding: 6px;
                        border-radius: 5px;
                        align-text: center;
                        font-weight: bold;
                        margin: 10px 0px;
                        height: 30px;
                      "
                    >
                      {{ props.row.balance }}
                    </div>
                    <div
                      v-else
                      style="
                        background: #ddf7e3;
                        color: green;
                        padding: 6px;
                        border-radius: 5px;
                        font-weight: bold;
                        margin: 10px 0px;
                        height: 30px;
                      "
                    >
                      {{ props.row.balance }}
                    </div>
                  </q-td>

                  <q-td key="actions" :props="props">
                    <q-btn
                      style="
                        border: 1px solid white;
                        background: radial-gradient(circle, #dec57c 0%, #ba852a 100%);
                        color: white;
                        width: 120px;
                      "
                      dense
                      no-caps
                      :id="props.row._id"
                      size="s"
                      @click="viewStatement(props.row)"
                      >View Statement</q-btn
                    >
                    <q-btn
                      v-if="
                        props.row.amount_invested !== 'CLOSED' &&
                        props.row.days !== null &&
                        props.row.days < 8
                      "
                      style="margin-left: 5px; background: red; color: white"
                      no-caps
                      :id="props.row._id"
                      size="s"
                      @click="exitInvestment(props.row)"
                      >Exit / Rollover</q-btn
                    >
                    <q-btn
                      flat
                      v-if="props.row.amount_invested === 'CLOSED'"
                      style="margin-left: 5px; background: transparant; color: green"
                      icon="insert_chart_outlined"
                      no-caps
                      :id="props.row._id"
                      size="s"
                      @click="getGraph(props.row)"
                    >
                      <q-tooltip anchor="center right" self="center left"
                        >Show Chart</q-tooltip
                      >
                    </q-btn>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-if="screenwidth <= 1023">
      <div style="display: flex; justify-content: space-between">
        <div style="margin: 5px 25px"><strong>INVESTMENTS</strong></div>
        <q-input
          :dark="false"
          outlined
          dense
          v-model="search"
          label="Search"
          class="mySearch"
          style="margin-right: 25px; width: 200px; height: 40px; border-radius: 5px"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <q-card
        class="my-card text-white"
        style="margin-top: 5px"
        v-for="(item, index) in rows"
        :key="index"
      >
        <q-card-section>
          <div class="gridLabels">Account</div>
          <div class="gridData">
            {{ item.investor_acc_number }}
          </div>
          <br />
          <div class="gridLabels">Name</div>
          <div class="gridData">
            {{ item.investment_name }}
          </div>
          <br />
          <div class="gridLabels">Code</div>
          <div class="gridData">
            {{ item.opportunity_code }}
          </div>
          <br />
          <div class="gridLabels">Inv No.</div>
          <div class="gridData">
            {{ item.investment_number }}
          </div>
          <br />
          <div class="gridLabels">Amount Invested</div>
          <div
            class="gridData"
            v-if="item.amount_invested === 'CLOSED'"
            style="color: pink"
          >
            {{ item.amount_invested }}
          </div>
          <div class="gridData" v-else>
            {{ item.amount_invested }}
          </div>
          <br />
          <div class="gridLabels">Balance</div>
          <div class="gridData" v-if="item.balance === 'CLOSED'" style="color: pink">
            {{ item.balance }}
          </div>
          <div class="gridData" v-else>
            {{ item.balance }}
          </div>
          <br />
        </q-card-section>
        <q-card-actions>
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 100%;
            "
          >
            <div>
              <q-btn
                style="
                  border: 1px solid white;
                  background: radial-gradient(circle, #dec57c 0%, #ba852a 100%);
                  color: white;
                  width: 100%;
                  margin: 5px 5px;
                "
                dense
                no-caps
                :id="item._id"
                size="s"
                @click="viewStatement(item)"
                >View Statement</q-btn
              >
            </div>
            <div>
              <q-btn
                flat
                v-if="item.amount_invested === 'CLOSED'"
                style="margin-left: 5px; background: transparant; color: green"
                icon="insert_chart_outlined"
                no-caps
                :id="item._id"
                size="s"
                @click="getGraph(item)"
              >
                <q-tooltip anchor="center right" self="center left">Show Chart</q-tooltip>
              </q-btn>
            </div>
            <div>
              <q-btn
                v-if="
                  item.amount_invested !== 'CLOSED' && item.days !== null && item.days < 8
                "
                style="
                  margin: 5px 5px;
                  padding: 5px 0px;
                  background: red;
                  color: white;
                  width: 100%;
                  border: 1px solid black;
                  height: 30px;
                "
                no-caps
                dense
                :id="item._id"
                size="s"
                @click="exitInvestment(item)"
                >Exit / Rollover</q-btn
              >
            </div>
          </div>
        </q-card-actions>
      </q-card>
      <br />
    </div>

    <q-dialog v-model="showgraph" full-width>
      <q-card>
        <q-card-section>
          <div>
            <BarChart :chartData="display_data" :options="options" style="height: 75vh" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-black">
          <q-btn flat label="close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="fullWidth" full-width>
      <q-card class="">
        <q-card-section>
          <div class="text-h6">Exit / Rollover</div>
        </q-card-section>

        <q-card-section>
          <p>
            With reference to the Investment specified below, the next investment cycle is
            in the planning phase and it is necessary to determine what your intention
            might be upon exit of this investment. We will be in further communication
            closer to the exit date for your final decision.
          </p>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div style="display: flex; flex-direction: column">
            <div style="display: flex; justify-content: space-evenly">
              <div style="align-text: center; width: 30%">
                <strong>Investment Name:</strong>
                {{ investmentExit.investment_name }}
              </div>

              <div style="align-text: center; width: 30%">
                <strong>Account Number: </strong> {{ investmentExit.investor_acc_number }}
              </div>
              <div style="align-text: center; width: 30%">
                <strong>Unit:</strong> {{ investmentExit.opportunity_code }}
              </div>
            </div>
            <br />
            <hr style="width: 100%" />

            <div style="display: flex">
              <div style="width: 30%; text-align: center">Amount Invested</div>
              <div style="width: 30%; text-align: center">
                Interest: {{ dayjs(new Date()).format("DD MMM YY") }}
              </div>
              <div style="width: 30%; text-align: center">
                Balance: {{ dayjs(new Date()).format("DD MMM YY") }}
              </div>
            </div>
            <div style="display: flex">
              <div style="width: 30%; text-align: center">
                {{ investmentExit.amount_invested }}
              </div>
              <div style="width: 30%; text-align: center">
                {{ investmentExit.current_interest_earned }}
              </div>
              <div style="width: 30%; text-align: center">
                {{ investmentExit.balance }}
              </div>
            </div>

            <hr style="width: 100%" />
            <br />
            <p>
              PLease refer to important information below
              <strong>before</strong> submitting the form.
            </p>

            <p>
              <strong>Disclaimer:</strong> The following is applicable to the next
              available investment phase. Please note these figures are based as at
              {{ dayjs(new Date()).format("DD-MM-YYYY") }} and will change depending on
              the actual transfer date.
            </p>
            <p>
              <strong>Fixed Investor Returns:</strong> The projected returns below are
              applicable to the next investment cycle. Please note that these are subject
              to change and should this occur, Opportunity will communicate this to you.
            </p>
            <ol>
              <li>Investments of R 100 000 – R 499 000 @ 14% p.a</li>
              <li>Investments of R 500 000 – R 999 000 @ 16% p.a</li>
              <li>Investments of R 1 000 000 upwards @ 18% p.a</li>
            </ol>
            <hr style="width: 100%" />
            <br />
            <div>
              Please Indicate below which option you are interested in when transfer
              occurs, and we will contact you to confirm:
            </div>
            <br />
            <div style="display: flex">
              <div style="width: 25%">
                <q-checkbox
                  v-model="investmentExit.full_exit"
                  label="Full Exit"
                  color="yellow"
                  debounce="500"
                  keep-color
                  @update:model-value="updateCheckbox_full_exit"
                />
              </div>
              <div style="width: 25%; margin: 5px; text-align: end">
                {{ investmentExit.balance }}
              </div>
            </div>
            <hr style="width: 90%; border-color: grey" />
            <div style="display: flex">
              <div style="width: 25%">
                <q-checkbox
                  keep-color
                  v-model="investmentExit.full_rollover"
                  label="Full Rollover"
                  color="orange"
                  @update:model-value="updateCheckbox_full_rollover"
                />
              </div>
              <div style="width: 25%; margin: 5px; text-align: end">
                {{ investmentExit.balance }}
              </div>
            </div>
            <hr style="width: 90%; border-color: grey" />
            <br />
            <div style="display: flex">
              <div style="width: 25%">
                <q-checkbox
                  keep-color
                  v-model="investmentExit.partial_exit"
                  label="Partial Rollover"
                  color="red"
                  @update:model-value="updateCheckbox_partial_exit"
                />
              </div>
              <div style="display: flex; flex-direction: column; width: 70%">
                <div style="display: flex; margin: 5px; text-align: end">
                  <QCurrencyInput
                    dense
                    label="Rollover Amount"
                    v-model="investmentExit.float_investment"
                    :options="{ currency: 'ZAR' }"
                    debounce="500"
                    @update:model-value="updateFloat_investment"
                    :disable="!investmentExit.partial_exit"
                    hint="Enter rollover amount"
                  />
                  <QCurrencyInput
                    style="margin-left: 25px"
                    dense
                    label="Exit Amount"
                    v-model="investmentExit.float_exit"
                    :options="{ currency: 'ZAR' }"
                    disable
                    prepend="R"
                  />
                  <QCurrencyInput
                    style="margin-left: 25px"
                    dense
                    label="Total"
                    v-model="investmentExit.float_balance"
                    :options="{ currency: 'ZAR' }"
                    disable
                    prepend="R"
                  />
                </div>
              </div>
            </div>
            <br />
            <hr style="width: 100%" />
            <br />
            <div>
              <q-checkbox
                v-model="investmentExit.agree"
                keep-color
                label="I understand the disclaimer above and I agree to the terms and conditions of the exit/rollover."
                color="yellow"
              />
            </div>
            <br />
            <span
              style="color: yellow"
              v-if="
                !investmentExit.agree ||
                (!investmentExit.full_exit &&
                  !investmentExit.full_rollover &&
                  !investmentExit.partial_exit)
              "
              >The button is disabled if you have not chosen an option
              <strong><u>and</u></strong> agreed to to the terms</span
            >
            <div style="margin: 10px 0px">
              <q-btn
                color="amber"
                no-caps
                v-close-popup
                @click="submitExit"
                :disable="
                  !investmentExit.agree ||
                  (!investmentExit.full_exit &&
                    !investmentExit.full_rollover &&
                    !investmentExit.partial_exit)
                "
              >
                Submit
              </q-btn>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Close" color="black" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, watchEffect, watch } from "vue";
import { useQuasar } from "quasar";
import nodeService from "../services/nodeService";
import pythonService from "../services/pythonService";
import { useUserStore } from "../stores/userStore";
import { useRouter, useRoute } from "vue-router";
import stdHeader from "../components/StdHeader.vue";
// import GraphInvestments from "../components/GraphInvestments.vue";
import verifyUser from "src/helperFiles/verifyUserToken";
import dayjs from "dayjs";
import QCurrencyInput from "../components/QCurrencyInput.vue";
import axios from "axios";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);
Chart.register(...registerables);

const $q = useQuasar();
const store = useUserStore();
const router = useRouter();
const route = useRoute();

const showgraph = ref(false);

const getGraph = async (event) => {
  closed_investments.value = [];
  closed_investments.value.push(event);
  get_chart_info();
  showgraph.value = true;
};

const summary_data = ref([]);

const closed_investments = ref([]);
const chart_data = ref([]);

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

  await pythonService
    .getChartData(data)
    .then((response) => {
      chart_data.value = [];
      chart_data.value = response.data.final_chart_data;

      options.value.plugins.title.text = `Investment Summary - ${closed_investments.value[0].investor_acc_number}`;
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
      console.error(error);
    });
};

const filter = ref("");

verifyUser();

const columns = [
  {
    name: "investor_acc_number",
    required: true,
    label: "Account",
    align: "center",
    field: "investor_acc_number",
    sortable: true,
  },
  {
    name: "investment_name",
    required: true,
    label: "Name",
    align: "left",
    field: "investment_name",
    sortable: true,
  },
  {
    name: "opportunity_code",
    align: "center",
    label: "Code",
    field: "opportunity_code",

    sortable: true,
  },
  {
    name: "investment_number",
    label: "Inv No.",
    field: "investment_number",
    align: "center",
    sortable: true,
  },
  {
    name: "amount_invested",
    label: "Amount Invested",
    field: "amount_invested",
    sortable: true,
    align: "center",
  },
  {
    name: "balance",
    label: "Balance",
    field: "balance",
    sortable: true,
    align: "center",
  },
  { name: "actions", label: "Actions", field: "", align: "left" },
];

const rows = ref([]);

const screenwidth = ref(window.innerWidth);
const gridMode = ref(false);

window.addEventListener("resize", () => {
  screenwidth.value = window.innerWidth;
});

watchEffect(() => {
  if (screenwidth.value < 1023) {
    gridMode.value = true;
  } else {
    gridMode.value = false;
  }
});

const initialPagination = {
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 30, // 0 means show all rows
};

// Hard Coded
const investmentExit = ref({});

const fullWidth = ref(false);

const updateCheckbox_full_exit = () => {
  if (investmentExit.value.full_exit) {
    investmentExit.value.full_rollover = false;
    investmentExit.value.partial_exit = false;
  }
};

const updateCheckbox_full_rollover = () => {
  if (investmentExit.value.full_rollover) {
    investmentExit.value.full_exit = false;
    investmentExit.value.partial_exit = false;
  }
};

const updateCheckbox_partial_exit = () => {
  if (investmentExit.value.partial_exit) {
    investmentExit.value.full_exit = false;
    investmentExit.value.full_rollover = false;
  }
};

const exitInvestment = (e) => {
  investmentExit.value = {};
  investmentExit.value = e;

  investmentExit.value.float_investment = parseFloat(
    investmentExit.value.amount_invested.replace(/[^0-9.]/g, "")
  );
  investmentExit.value.float_balance = parseFloat(
    investmentExit.value.balance.replace(/[^0-9.]/g, "")
  );

  investmentExit.value.current_interest_earned = convertToString(
    investmentExit.value.float_balance - investmentExit.value.float_investment
  );

  investmentExit.value.float_exit =
    investmentExit.value.float_balance - investmentExit.value.float_investment;

  investmentExit.value.float_balance = investmentExit.value.float_balance;

  investmentExit.value.full_exit = false;
  investmentExit.value.full_rollover = false;
  investmentExit.value.partial_exit = false;

  investmentExit.value.agree = false;
  investmentExit.value.copy_me_on_email = false;

  fullWidth.value = true;
};

const submitExit = async () => {
 
  await pythonService
    .investmendEnding(investmentExit.value)
    .then((res) => {
 
      // notification that notification has been sent
      if (res.data.message === "Email sent successfully") {
        $q.notify({
          color: "positive",
          message: "Investment Ending Notification has been sent",
          position: "top",
          icon: "check_circle",
        });
      } else {
        $q.notify({
          color: "negative",
          message:
            "Investment Ending Notification has not been sent, please try again later",
          position: "top",
          icon: "check_circle",
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const updateFloat_investment = () => {
  investmentExit.value.float_exit =
    investmentExit.value.float_balance - investmentExit.value.float_investment;
};

const viewStatement = async (row) => {
  let data = {
    id: row._id,
    opportunity_code: row.opportunity_code,
    investment_number: row.investment_number,
  };

  router.push({ name: "adminStatements", params: data });
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

    response.data.forEach((el) => {
      if (
        el.amount_invested !== "CLOSED" &&
        el.amount_invested !== "" &&
        el.amount_invested !== undefined &&
        el.amount_invested !== null
      ) {
        el.amount_invested = convertToString(el.amount_invested);
        el.balance = convertToString(el.balance);
      }
    });

    rows.value = response.data;

    let filtered = route.path.split("/");

    if (filtered[2] === "useraccounts") {
      rows.value = rows.value.filter((el) => {
        return el.investor_acc_number === route.params.id;
      });
    }
  } catch (error) {
    console.error(error);
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
  str.reverse().unshift("R ");
  str = str.join("");
  return str;
};

onBeforeMount(() => {
  get_info();
});

$q.dark.set(true);
</script>

<style scoped>
/* .my-card {
  background-color: transparent !important;
  color: lightgrey !important;
  border: none;
} */

.mySearch {
  width: 200px;
  background: white;
  border-radius: 5px;
}

.gridLabels {
  color: lightgrey;
  font-weight: bold;
  text-align: center;
}
.gridData {
  text-align: center;
}

tr {
  color: lightgrey !important;
}
tr:nth-child(even) {
  background-color: #333333 !important;
}
tr:nth-child(odd) {
  background-color: #444444 !important;
}

.my-card-mobile {
  color: lightgrey !important;
}
</style>
