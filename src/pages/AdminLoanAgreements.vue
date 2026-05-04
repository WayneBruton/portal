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
              title="Loan Agreements"
              :rows="rows"
              :columns="columns"
              :filter="filter"
              row-key="name"
              style="color: lightgrey; font-size: 18px"
              wrap-cells
            >
              <template v-slot:top-right>
                <q-input
                  dense
                  debounce="300"
                  v-model="filter"
                  class="mySearch"
                  :dark="false"
                  placeholder="Search"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="account_number" :props="props">
                    {{ props.row.account_number }}
                  </q-td>
                  <q-td key="development" :props="props">
                    {{ props.row.development }}
                  </q-td>
                  <q-td key="unit" :props="props">
                    {{ props.row.unit }}
                  </q-td>
                  <q-td key="actions" :props="props">
                    <a
                      :href="props.row.loanAgreement"
                      download
                      target="_blank"
                      style="text-decoration: none; color: red; background: white"
                    >
                      <q-btn
                        size="1rem"
                        icon="picture_as_pdf"
                        color="red"
                        no-caps
                        :id="props.row._id"
                      ></q-btn>
                    </a>
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
import stdHeader from "../components/StdHeader.vue";
// import { useUserStore } from "../stores/userStore";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

// const store = useUserStore();
const route = useRoute();
// console.log("route", route.params);

let pythonUrl = ref("");

if (process.env.DEV) {
  pythonUrl.value = "http://localhost:8000";
} else {
  pythonUrl.value = "https://omh-python.herokuapp.com";
}

const columns = [
  {
    name: "account_number",
    required: true,
    label: "Account",
    align: "left",
    field: "account_number",
    sortable: true,
  },
  {
    name: "development",
    align: "left",
    label: "Development",
    field: "development",

    sortable: true,
  },
  {
    name: "unit",
    align: "left",
    label: "Unit",
    field: "unit",

    sortable: true,
  },

  {
    name: "actions",
    label: "View",
    field: "actions",
    align: "center",
    style: "width: 30%",
  },
];

const rows = ref([]);

const filter = ref("");

// const loanAgreements = store.loanAgreements;

// console.log("loanAgreements", loanAgreements);

const loanAgreements = ref([]);

const get_files = async () => {
  let data = {
    investor_acc_number: route.params.id,
  };

  let response = await axios.post(`${pythonUrl.value}/get_loan_agreements`, data);
  // console.log("response", response.data.loan_agreements);
  loanAgreements.value = response.data.loan_agreements;
  loanAgreements.value.forEach((el) => {
    rows.value.push(el);
  });
  // rows.value = response.data;
};

onMounted(() => {
  get_files();
});

// loanAgreements.forEach((el) => {
//   let fileName = el.value.split("/");
//   fileName = fileName[fileName.length - 1].split("LoanAgreement")[0];
//   el.account_number = fileName.slice(0, 6);
//   let unit_number = fileName.slice(6);
//   el.unit = unit_number;
//   if (unit_number.length === 6) {
//     el.unit = unit_number.slice(2, 6);
//     if (unit_number.slice(0, 2) === "HV") {
//       el.development = "Heron View";
//     }
//     if (unit_number.slice(0, 2) === "HF") {
//       el.development = "Heron Fields";
//     }
//   } else if (unit_number.length === 5) {
//     el.unit = unit_number.slice(1, 5);
//     el.development = "Endulini";
//   }
//   // el.unit = unit_number.slice(0, 2);

//   // filename equals first 6 characters of filename + "-" + the remaining characterts
//   fileName = fileName.slice(0, 6) + "-" + fileName.slice(6);

//   el.fileName = fileName;

//   rows.value.push(el);
// });
</script>

<style scoped>
.mySearch {
  width: 200px;
  background: white;
  border-radius: 5px;
}
</style>
