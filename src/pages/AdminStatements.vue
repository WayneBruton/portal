<template>
  <q-page>
    <std-header />
    <br /><br />
    <!-- <div class="row"> -->
    <div
      style="
        display: flex;
        justify-content: center;
        width: 100vw;
        height: 50px;
        align-items: center;
        margin: 10px 10px 30px 10px;
      "
    >
      <a :href="href1" style="text-decoration: none; color: white; margin: 25px 0px">
        <q-btn
          style="
            border: 1px solid white;
            background: radial-gradient(circle, #dec57c 0%, #ba852a 100%);
            color: white;
            width: 270px;

            margin: 0px 2px;
          "
          dense
          no-caps
          size="s"
          >Download Statement(Normal Format)</q-btn
        ></a
      >
      <a
        :href="href2"
        target="_blank"
        style="text-decoration: none; color: white; margin: 25px 0px"
      >
        <q-btn
          style="
            border: 1px solid white;
            background: radial-gradient(circle, #dec57c 0%, #ba852a 100%);
            color: white;
            width: 270px;

            margin: 0px 2px;
          "
          dense
          no-caps
          size="s"
          >Download Statement(Exit Format)</q-btn
        ></a
      >
    </div>
    <!-- </div> -->
    <div class="row">
      <div class="col-1 col-md-1 col-lg-1 col-xl-1"></div>

      <div class="col-10 col-md-10 col-lg-10 col-xl-10">
        <q-card class="my-card text-white">
          <q-card-section>
            <q-table
              class="my-sticky-header-table"
              :title="title"
              :rows="rows"
              :grid="grid"
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
                  <q-td key="interest_category" :props="props">
                    {{ props.row.interest_category }}
                  </q-td>
                  <q-td key="investor_acc_number" :props="props">
                    {{ props.row.investor_acc_number }}
                  </q-td>
                  <q-td key="days" :props="props">
                    {{ props.row.days }}
                  </q-td>
                  <q-td key="interest_until" :props="props">
                    {{ props.row.interest_until }}
                  </q-td>
                  <q-td key="interest_rate" :props="props">
                    {{ props.row.interest_rate }}
                  </q-td>
                  <q-td key="investment_amount" :props="props">
                    {{ props.row.investment_amount }}
                  </q-td>
                  <q-td key="interest" :props="props">
                    {{ props.row.interest }}
                  </q-td>
                  <q-td key="cumulative_interest" :props="props">
                    {{ props.row.cumulative_interest }}
                  </q-td>
                  <q-td key="balance" :props="props">
                    {{ props.row.balance }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-1 col-md-1 col-lg-1 col-xl-1"></div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount, watchEffect } from "vue";
import { useQuasar } from "quasar";
import nodeService from "../services/nodeService";
import pythonService from "../services/pythonService";
import globalVariables from "../services/globalVariables";
import { useUserStore } from "../stores/userStore";
import { useRouter, useRoute } from "vue-router";
import stdHeader from "../components/StdHeader.vue";
import verifyUser from "src/helperFiles/verifyUserToken";
import axios from "axios";

const $q = useQuasar();
const store = useUserStore();
const router = useRouter();
const route = useRoute();

const filter = ref("");

verifyUser();

const columns = [
  {
    name: "interest_category",
    required: true,
    label: "Type",
    align: "left",
    field: "interest_category",
    sortable: true,
    style: "width: 250px",
  },
  {
    name: "investor_acc_number",
    required: true,
    label: "Code",
    align: "center",
    field: "investor_acc_number",
    sortable: true,
    style: "width: 150px",
  },
  {
    name: "days",
    required: true,
    label: "Days",
    align: "center",
    field: "days",
    sortable: true,
    style: "width: 150px",
  },
  {
    name: "interest_until",
    required: true,
    label: "Date",
    align: "center",
    field: "interest_until",
    sortable: true,
    style: "width: 150px",
  },
  {
    name: "interest_rate",
    required: true,
    label: "Interest %",
    align: "right",
    field: "interest_rate",
    sortable: true,
    style: "width: 150px",
  },
  {
    name: "investment_amount",
    required: true,
    label: "Investment",
    align: "right",
    field: "investment_amount",
    sortable: true,
    style: "width: 150px",
  },
  {
    name: "interest",
    required: true,
    label: "Interest",
    align: "right",
    field: "interest",
    sortable: true,
    style: "width: 150px",
  },
  {
    name: "cumulative_interest",
    required: true,
    label: "Cumulative Interest",
    align: "right",
    field: "cumulative_interest",
    sortable: true,
    style: "width: 150px",
  },
  {
    name: "balance",
    required: true,
    label: "Balance",
    align: "right",
    field: "balance",
    sortable: true,
    style: "width: 200px",
  },
];

const rows = ref([]);
const title = ref("");

const grid = ref(false);

const screenwidth = ref(window.innerWidth);

window.addEventListener("resize", () => {
  screenwidth.value = window.innerWidth;
});

watchEffect(() => {
  if (screenwidth.value < 1023) {
    grid.value = true;
  } else {
    grid.value = false;
  }
});

const initialPagination = {
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 30, // 0 means show all rows
  // rowsNumber: xx if getting data from a server
};

const get_info = async () => {
  let data = route.params;
  data.investment_number = parseInt(data.investment_number);

  try {
    const response = await nodeService.getInvestorStatement(route.params);
    response.data = response.data.filter((el) => {
      return el.days !== 0;
    });
    response.data.forEach((el) => {
      if (el.interest_category === "Interest") {
        el.interest_category = "Released Interest";
      } else if (el.interest_category === "Trust Interest") {
        el.interest_category = "Investment Interest";
      }

      if (el.balance === el.investment_amount) {
        el.interest = "";
      }
      // replace all '/' with '-' in el.effect_date
      el.effective_date = el.effective_date.replace(/\//g, "-");
      // do the same with interest_until
      // el.interest_until = el.interest_until.replace(/\//g, "-");
    });

    response.data.forEach((el, index) => {
      if (index === 0 || index === 1) {
        el.cumulative_interest = 0;
      } else {
        // create a new variable called interest_current and use el.interest but remove any non-numeric characters and convert to a float
        // then add interest_current to el.cumulative_interest
        el.cumulative_interest =
          parseFloat(el.balance.replace(/[^0-9.-]+/g, "")) -
          parseFloat(el.investment_amount.replace(/[^0-9.-]+/g, ""));
        // +
        //   parseFloat(arr[index - 1].cumulative_interest);
      }
      if (el.balance !== el.investment_amount) {
        el.investment_amount = "";
      }
    });

    response.data.forEach((el, index) => {
      if (index === 0 || index === 1) {
        el.cumulative_interest = "";
      } else {
        el.cumulative_interest = convertToString(el.cumulative_interest);
      }
      // el.balance = convertToString(el.balance);
    });

    // loop through response.data and move the first object with interest_category === "Released" to immedietly before the first object with interest_category === "Released Interest"
    let temp;
    response.data.forEach((el, index) => {
      if (el.interest_category === "Released") {
        temp = response.data.splice(index, 1);
        // response.data.splice(index - 1, 0, temp[0]);
      }
    });

    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].interest_category === "Released Interest") {
        response.data.splice(i, 0, temp[0]);
        break;
      }
    }

    response.data.forEach((el, index, arr) => {
      if (el.interest_category === "Released") {
        el.balance = arr[index - 1].balance;
        el.cumulative_interest = arr[index - 1].cumulative_interest;
        el.interest = "0.00";
      }

      // if interest_until exists replace all '/' with '-' in el.interest_until
      if (el.interest_until) {
        el.interest_until = el.interest_until.replace(/\//g, "-");
      } else {
        el.interest_until = el.effective_date;
      }
    });

    rows.value = response.data;

    title.value = `Statement - ${data.opportunity_code}`;

    create_statements();
  } catch (error) {
    console.error(error);
  }
};

const href1 = ref("");
const href2 = ref("");

const create_statements = async () => {
  try {
    let data = {
      data: rows.value,
    };

    await pythonService
      .create_portal_statement(data)
      .then((response) => {
        if (response.data.type1) {
          let newHref = `${globalVariables.value}/get_investor_statement?investor_statement_name=${response.data.type1}`;
          // let newHref = `${urlPython.value}/get_investor_statement?investor_statement_name=${response.data.type1}`;
          href1.value = `${newHref}`;
        }
        if (response.data.type2) {
          let newHref = `${globalVariables.value}/get_investor_statement?investor_statement_name=${response.data.type2}`;
          // let newHref = `${urlPython.value}/get_investor_statement?investor_statement_name=${response.data.type2}`;
          href2.value = `${newHref}`;
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
  str.reverse();
  // unshift("R ");
  str = str.join("");
  return str;
};

onBeforeMount(() => {
  get_info();
});

$q.dark.set(true);
</script>

<style scoped>
.mySearch {
  width: 200px;
  background: white;
  border-radius: 5px;
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
</style>
