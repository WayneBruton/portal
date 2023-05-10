<template>
  <q-page>
    <std-header />

    <br /><br />
    <div class="row">
      <div class="col-1 col-md-1 col-lg-1 col-xl-1"></div>
      <div class="col-10 col-md-10 col-lg-10 col-xl-10">
        <q-card class="my-card text-white">
          <q-card-section>
            <q-table
              class="my-sticky-header-table"
              title="Investments"
              :rows="rows"
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
                  <q-td key="_id" :props="props">
                    {{ props.row._id }}
                  </q-td>
                  <q-td key="investor_acc_number" :props="props">
                    {{ props.row.investor_acc_number }}
                  </q-td>
                  <q-td key="opportunity_code" :props="props">
                    {{ props.row.opportunity_code }}
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
                      @click="viewStatement(props.row)"
                      size="s"
                      >View Statement</q-btn
                    >
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
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import nodeService from "../services/nodeService";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";
import stdHeader from "../components/StdHeader.vue";
import verifyUser from "src/helperFiles/verifyUserToken";

const $q = useQuasar();
const store = useUserStore();
const router = useRouter();

const filter = ref("");

verifyUser();

const columns = [
  {
    name: "_id",
    required: true,
    label: "id",
    align: "left",
    field: "_id",
    sortable: true,
  },
  {
    name: "investor_acc_number",
    required: true,
    label: "Account",
    align: "center",
    field: "investor_acc_number",
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
  { name: "actions", label: "Actions", field: "actions", align: "left" },
];

const rows = ref([]);

const initialPagination = {
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 30, // 0 means show all rows
};

const get_info = async () => {
  try {
    const response = await nodeService.getInvestments();
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
  } catch (error) {
    console.error(error);
  }
};

const viewStatement = async (row) => {
  let data = {
    id: row._id,
    opportunity_code: row.opportunity_code,
    investment_number: row.investment_number,
  };

  router.push({ name: "adminStatements", params: data });
};

// const invite = (e) => {
//   console.log(e);

// };

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
  str.reverse().unshift("R ");
  str = str.join("");
  return str;
};

onBeforeMount(() => {
  get_info();
});

// get_info();

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
