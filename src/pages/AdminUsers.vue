<template>
  <q-page>
    <stdHeader />
    <br /><br />
    <div class="row">
      <div class="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
      <div class="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <q-card
          class="my-card text-white"
          style="background: #121212"
          flat
          :bordered="false"
        >
          <q-card-section>
            <q-table
              class="my-sticky-header-table"
              ref="table"
              title="Users"
              :rows="rows"
              :columns="columns"
              :filter="filter"
              row-key="name"
              :pagination="initialPagination"
              style="color: lightgrey; font-size: 18px"
              wrap-cells
            >
              <template v-slot:top-right>
                <q-btn
                  color="amber"
                  icon="person_add_alt_1"
                  dense
                  no-caps
                  label="Add User"
                  style="margin-right: 10px; color: black"
                  @click="add_user = true"
                ></q-btn>

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
                  <q-td key="name" :props="props">
                    {{ props.row.name }}
                  </q-td>
                  <q-td key="surname" :props="props">
                    {{ props.row.surname }}
                  </q-td>
                  <q-td key="email" :props="props">
                    {{ props.row.email }}
                  </q-td>
                  <q-td key="mobile" :props="props">
                    {{ props.row.mobile }}
                  </q-td>

                  <q-td key="actions" :props="props">
                    <q-btn
                      color="red"
                      flat
                      icon="delete"
                      dense
                      no-caps
                      :id="props.row._id"
                      size="m"
                      @click="removeDialog(props.row._id)"
                    ></q-btn>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="remove" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete_forever" color="amber" text-color="white" />
          <span class="q-ml-sm">Are you sure? this cannot be undone.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="amber" v-close-popup />
          <q-space />
          <q-btn flat label="Delete" color="amber" @click="deleteUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="add_user" persistent>
      <q-card style="width: 600px">
        <q-card-section class="row items-center">
          <q-avatar icon="person_add_alt_1" color="amber" text-color="white" />
          <q-space />
          <h6 class="h6">Add User</h6>
          <q-space />
        </q-card-section>

        <q-card-section>
          <div class="q-pa-md" style="max-width: 600px">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input filled v-model="user.name" label="Name" hint="Name" />
              <q-input filled v-model="user.surname" label="Surname" hint="Surname" />
              <q-input
                filled
                v-model="user.email"
                type="email"
                label="Email"
                hint="Email"
              />
              <q-input
                filled
                v-model="user.mobile"
                mask="### ### ####"
                label="Mobile"
                hint="Mobile"
              />
            </q-form>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-space />
          <q-btn
            outline
            label="Submit"
            @click="onSubmit"
            color="amber"
            :disabled="!user.name && !user.surname && !user.email && !user.mobile"
          />
          <q-space />
          <q-btn outline label="Cancel" color="amber" @click="closeForm" />
          <q-space />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import nodeService from "../services/nodeService";
import stdHeader from "../components/StdHeader.vue";
import { useUserStore } from "../stores/userStore";
import verifyUser from "src/helperFiles/verifyUserToken";
import dayjs from "dayjs";

const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "center",
    field: "name",
    sortable: true,
  },
  {
    name: "surname",
    required: true,
    label: "Surname",
    align: "left",
    field: "surname",
    sortable: true,
  },
  {
    name: "email",
    align: "center",
    label: "email",
    field: "email",

    sortable: true,
  },
  {
    name: "mobile",
    align: "center",
    label: "mobile",
    field: "mobile",

    sortable: true,
  },

  { name: "actions", label: "Actions", field: "", align: "left" },
];

const rows = ref([]);

verifyUser();

const getUsers = async () => {
  const response = await nodeService.getAdminUsers().then((response) => {
    // console.log(response.data);
    rows.value = response.data;
  });
};

onMounted(async () => {
  getUsers();
});

const filter = ref("");

const store = useUserStore();
// console.log(store.name);

const remove = ref(false);
const add_user = ref(false);

const userToRemove = ref("");

const removeDialog = (id) => {
  remove.value = true;
  userToRemove.value = id;
  //   console.log(id);
};

const deleteUser = async () => {
  remove.value = false;
  let data = {
    _id: userToRemove.value,
  };
  const response = await nodeService.deleteAdminUser(data).then((response) => {
    console.log(response.data);
    getUsers();
  });
};

const user = ref({
  name: "",
  surname: "",
  email: "",
  mobile: "",
  active: true,
  password: "",
  role: "ADMIN",
  investor_id: "ADMIN",
  created_at: "",
  updated_at: "",
});

const onSubmit = async () => {
  // create string of random characters with a length of 8
  const randomString = Math.random().toString(36).substring(2, 10);
  user.value.password = randomString;
  user.value.created_at = dayjs().format("YYYY-MM-DD");
  user.value.updated_at = dayjs().format("YYYY-MM-DD");
  //   console.log(user.value);
  const response = await nodeService.addAdminUser(user.value).then((response) => {
    // console.log(response.data);
    closeForm();
    getUsers();
  });
};

const onReset = () => {
  user.value = {
    name: "",
    surname: "",
    email: "",
    mobile: "",
    active: true,
    password: "",
    role: "ADMIN",
    investor_id: "ADMIN",
    created_at: "",
    updated_at: "",
  };
};

const closeForm = () => {
  add_user.value = false;
  onReset();
};
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
