<template>
  <q-page>
    <std-header />
    <br /><br />
    <div class="row">
      <div class="col-1 col-md-1 col-lg-1 col-xl-1"></div>
      <div class="col-10 col-md-10 col-lg-10 col-xl-10">
        <!-- <q-card class="my-card text-white"> -->
        <!-- <q-card-section> -->
        <q-table
          class="my-sticky-header-table"
          title="Investors"
          :rows="rows"
          :columns="columns"
          :filter="filter"
          row-key="name"
          :pagination="initialPagination"
          style="color: lightgrey; font-size: 18px; margin: 10px 10px"
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
              <q-td key="investor_name" :props="props">
                {{ props.row.investor_name }}
              </q-td>
              <q-td key="investor_surname" :props="props">
                {{ props.row.investor_surname }}
              </q-td>
              <q-td key="investor_email" :props="props">
                {{ props.row.investor_email }}
              </q-td>
              <q-td key="actions" :props="props">
                <!-- style="margin-left: 5px; background: #5a6268; color: white" -->
                <q-btn
                  style="margin-left: 5px; background: #5a6268; color: white"
                  icon="remove_red_eye"
                  no-caps
                  :id="props.row._id"
                  @click="goToInvestor(props.row.investor_acc_number)"
                  size="sm"
                  >Investments</q-btn
                >
                <q-btn
                  style="margin-left: 5px; background: #333333; color: white"
                  icon="remove_red_eye"
                  no-caps
                  :id="props.row._id"
                  @click="investorUserAccounts(props.row)"
                  size="sm"
                  >Investor View</q-btn
                >
                <q-btn
                  v-if="props.row.needInvite"
                  style="
                    border: 1px solid white;
                    background: radial-gradient(circle, #dec57c 0%, #ba852a 100%);
                    color: white;
                  "
                  icon="mail"
                  dense
                  no-caps
                  :id="props.row._id"
                  @click="invite(props.row)"
                  size="sm"
                  >Invite</q-btn
                >
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <!-- </q-card-section> -->
        <!-- </q-card> -->
      </div>
      <div class="col-1 col-md-1 col-lg-1 col-xl-1"></div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import nodeService from "../services/nodeService";
import pythonService from "../services/pythonService";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";
import stdHeader from "../components/StdHeader.vue";
import verifyUser from "src/helperFiles/verifyUserToken";
import axios from "axios";

const $q = useQuasar();
const store = useUserStore();
const router = useRouter();

const filter = ref("");

verifyUser();

const columns = [
  {
    name: "investor_acc_number",
    required: true,
    label: "Acc",
    align: "left",
    field: "investor_acc_number",
    sortable: true,
  },
  {
    name: "investor_name",
    align: "left",
    label: "Name",
    field: "investor_name",

    sortable: true,
  },
  {
    name: "investor_surname",
    label: "Surname",
    field: "investor_surname",
    align: "left",
    sortable: true,
  },
  {
    name: "investor_email",
    label: "email",
    field: "investor_email",
    sortable: true,
    align: "left",
    style: "width: 20%",
  },
  {
    name: "actions",
    label: "Actions",
    field: "actions",
    align: "left",
    style: "width: 30%",
  },
];

const rows = ref([]);

const initialPagination = {
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 0, // 0 means show all rows
  // rowsNumber: xx if getting data from a server
};

const goToInvestor = (id) => {
  router.push({ name: "admininvestmentsinvestor", params: { id: id } });
};

const get_info = async () => {
  try {
    const response = await nodeService.getInvestors();

    response.data = response.data.filter((el) => {
      return el.investor_acc_number !== "";
    });

    // sort by investor_surname then by investor_name then by investor_acc_number
    response.data.sort((a, b) => {
      if (a.investor_surname < b.investor_surname) {
        return -1;
      }
      if (a.investor_surname > b.investor_surname) {
        return 1;
      }
      if (a.investor_name < b.investor_name) {
        return -1;
      }
      if (a.investor_name > b.investor_name) {
        return 1;
      }
      if (a.investor_acc_number < b.investor_acc_number) {
        return -1;
      }
      if (a.investor_acc_number > b.investor_acc_number) {
        return 1;
      }
      return 0;
    });

    rows.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

store.investor_view = false;
store.investor_acc_number = "";

const investorUserAccounts = (e) => {
  store.investor_view = true;
  store.investor_acc_number = e.investor_acc_number;

  router.push({ name: "adminuseraccounts", params: { id: e.investor_acc_number } });
};

const invite = async (e) => {
  // console.log(e);

  const response = await pythonService
    .addInvestorToPortal({
      email: e.investor_email,
      name: e.investor_name,
      surname: e.investor_surname,
      acc_number: e.investor_acc_number,
      id: e._id,
    })
    .then((res) => {
      // console.log("RESS", res);
      if (res.data.message === "Email sent successfully") {
        $q.notify({
          message: "Email sent successfully",
          color: "green",
          position: "top",
        });
        get_info();
      } else {
        $q.notify({
          message: "Email not sent",
          color: "red",
          position: "top",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      $q.notify({
        message: "Email not sent",
        color: "red",
        position: "top",
      });
    });
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
