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
              title="Documents"
              :rows="rows"
              :columns="columns"
              :filter="filter"
              :pagination="initialPagination"
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
                  <q-td key="document_type" :props="props">
                    {{ props.row.document_type }}
                  </q-td>
                  <q-td key="development" :props="props">
                    {{ props.row.development }}
                  </q-td>
                  <q-td key="unit" :props="props">
                    {{ props.row.unit }}
                  </q-td>
                  <q-td key="actions" :props="props">
                    <a
                      :href="props.row.document"
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
    name: "document_type",
    align: "left",
    label: "Document Type",
    field: "document_type",

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

const initialPagination = {
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 0, // 0 means show all rows
  // rowsNumber: xx if getting data from a server
};

// const store = useUserStore();

const route = useRoute();

// console.log("route", route.params);

const filter = ref("");

const rows = ref([]);

// const files = store.files;

const files = ref([]);

const get_files = async () => {
  let data = {
    investor_acc_number: route.params.id,
  };

  let response = await axios.post(`${pythonUrl.value}/get_other_documents`, data);
  // console.log("response", response.data.documents);
  files.value = response.data.documents;
  files.value.forEach((el) => {
    rows.value.push(el);
  });
  // rows.value = response.data;
};

onMounted(() => {
  get_files();
});

// files.forEach((el) => {
//   let fileName = el.value.split("/");
//   fileName = fileName[fileName.length - 1].split(".")[0];

//   // remove numeric characters from el.key
//   el.key = el.key.replace(/[0-9]/g, "");

//   // remove '_' from el.key
//   el.key = el.key.replace(/_/g, " ");

//   // male el.key title case
//   el.key = el.key
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");

//   let newKey = el.key.split(" ");
//   let newFileBreak = "";

//   if (newKey[0] === "Id") {
//     newFileBreak = fileName.split("ID")[0];
//   } else if (newKey[0] === "Disclaimer") {
//     newFileBreak = fileName.split("ID")[0];
//   } else if (newKey[0] === "Pop") {
//     newFileBreak = fileName.split("POP")[0];
//   } else {
//     newFileBreak = fileName.split(newKey[0])[0];
//   }

//   // take the first 6 characters of the newFileBreak and assign it to el.account_number
//   el.account_number = newFileBreak.slice(0, 6);
//   // take from character 7 to the end of the newFileBreak and assign it to el.unit
//   el.unit = newFileBreak.slice(6);
//   if (!el.unit.length) {
//     el.unit = "N/A";
//     el.development = "N/A";
//   } else if (el.unit.length === 5) {
//     el.development = "Endulini";
//     el.unit = el.unit.slice(1);
//   } else if (el.unit.length === 6) {
//     // if the first two characters of el.unit = "HV" then el.development = "Heron View" else if the first two characters of el.unit = "HF" then el.development = "Heron Fields"
//     if (el.unit.slice(0, 2) === "HV") {
//       el.development = "Heron View";
//       el.unit = el.unit.slice(2);
//     } else if (el.unit.slice(0, 2) === "HF") {
//       el.development = "Heron Fields";
//       el.unit = el.unit.slice(2);
//     }
//   }

//   // fileName = fileName.slice(0, 6);

//   el.fileName = fileName;
//   // el.account_number = fileName;
//   rows.value.push(el);
//   // sort rows by account number, then by key
//   rows.value.sort((a, b) => {
//     if (a.account_number < b.account_number) {
//       return -1;
//     }
//     if (a.account_number > b.account_number) {
//       return 1;
//     }
//     if (a.development < b.development) {
//       return -1;
//     }
//     if (a.development > b.development) {
//       return 1;
//     }
//     if (a.unit < b.unit) {
//       return -1;
//     }
//     if (a.unit > b.unit) {
//       return 1;
//     }

//     if (a.key < b.key) {
//       return -1;
//     }
//     if (a.key > b.key) {
//       return 1;
//     }
//     return 0;
//   });
// });
</script>

<style scoped>
.mySearch {
  width: 200px;
  background: white;
  border-radius: 5px;
}
</style>
