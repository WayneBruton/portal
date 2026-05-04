<template>
  <q-page>
    <std-header />
    <br /><br />
    <div class="row">
      <div class="col-1 col-md-1 col-lg-1 col-xl-1"></div>
      <div class="col-10 col-md-10 col-lg-10 col-xl-10">
        <q-card
          class="my-card text-white"
          style="background: #121212"
          flat
          :bordered="false"
        >
          <q-card-section>
            <q-table
              class="my-sticky-header-table"
              title="Opportunities"
              :rows="rows"
              :columns="columns"
              :filter="filter"
              :row-class="getRowClass"
              row-key="name"
              :pagination="initialPagination"
              style="color: lightgrey; font-size: 18px"
            >
              <template v-slot:top-right>
                <q-input
                  class="mySearch"
                  dark="false"
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
                  <q-td key="code" :props="props">
                    {{ props.row.opportunity_code }}
                  </q-td>
                  <q-td key="description" :props="props">
                    {{ props.row.opportunity_name }}
                  </q-td>
                  <q-td key="required" :props="props">
                    {{ props.row.opportunity_amount_required }}
                  </q-td>
                  <q-td key="invested" :props="props">
                    {{ props.row.total_investment }}
                  </q-td>
                  <q-td key="shorfall" :props="props">
                    {{ props.row.investment_shortfall }}
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
    name: "code",
    required: true,
    label: "Code",
    align: "left",
    field: "opportunity_code",
    sortable: true,
  },
  {
    name: "description",
    align: "left",
    label: "Name",
    field: "opportunity_name",
    style: "width: 200px",
    sortable: true,
  },
  {
    name: "required",
    label: "Required",
    field: "opportunity_amount_required",
    sortable: true,
  },
  { name: "invested", label: "Invested", field: "total_investment", sortable: true },
  { name: "shorfall", label: "Shortfall", field: "investment_shortfall", sortable: true },
];

const rows = ref([]);

const initialPagination = {
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 0, // 0 means show all rows
  // rowsNumber: xx if getting data from a server
};

const get_info = async () => {
  try {
    const response = await nodeService.adminOpportunities();

    response.data.forEach((el) => {
      if (el.investment_shortfall < 0) {
        el.investment_shortfall = 0;
      }
      el.opportunity_amount_required = el.opportunity_amount_required.toFixed(2);
      el.total_investment = el.total_investment.toFixed(2);
      el.investment_shortfall = el.investment_shortfall.toFixed(2);
      el.opportunity_amount_required = convertToString(el.opportunity_amount_required);
      el.total_investment = convertToString(el.total_investment);
      el.investment_shortfall = convertToString(el.investment_shortfall);
    });
    //sort response by code
    response.data.sort((a, b) => {
      if (a.opportunity_code < b.opportunity_code) {
        return -1;
      }
      if (a.opportunity_code > b.opportunity_code) {
        return 1;
      }
      return 0;
    });

    rows.value = response.data;
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
