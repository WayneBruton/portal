<template>
  <div style="display: flex; flex-direction: column">
    <div class="row" v-if="screen_width < 1023">
      <div class="bg-black text-white col" style="height: 14vh">
        <q-toolbar>
          <q-img
            class="img-first"
            src="../assets/logo-light.png"
            style="width: 11%"
            v-if="screen_width < 1023"
          />
          <q-space v-if="screen_width < 1023" />
          <q-btn
            icon="menu"
            size="xl"
            v-if="screen_width < 1023"
            style="align-items: center"
          >
            <q-menu auto-close>
              <q-list style="min-width: 100px" v-if="!store.investor_view">
                <q-item clickable v-for="(item, index) in route_links" :key="index">
                  <q-item-section :to="item.path">
                    <q-btn no-caps flat :to="item.path">{{ item.name }}</q-btn>
                  </q-item-section>
                </q-item>
                <q-item clickable>
                  <q-btn
                    icon="logout"
                    label="Logout"
                    dark
                    no-caps
                    color="grey-6"
                    @click="logout"
                    flat
                  />
                </q-item>
              </q-list>
              <q-list style="min-width: 100px" v-else>
                <q-item
                  clickable
                  v-for="(item, index) in investor_view_links"
                  :key="index"
                >
                  <q-item-section :to="item.path">
                    <q-btn no-caps flat :to="item.path">{{ item.name }}</q-btn>
                  </q-item-section>
                </q-item>
                <q-item clickable>
                  <q-btn
                    icon="logout"
                    label="Logout"
                    dark
                    no-caps
                    color="grey-6"
                    @click="logout"
                    flat
                  />
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <!-- <q-space /> -->
        </q-toolbar>
      </div>
    </div>
    <div class="row" v-if="screen_width >= 1023">
      <div
        class="bg-grey-9 text-white col sticky-element"
        style="display: flex; justify-content: space-evenly"
      >
        <q-img class="img-first" src="../assets/logo-light.png" />

        <q-toolbar v-if="!store.investor_view">
          <div style="margin-left: 15%; display: flex">
            <q-btn
              no-caps
              flat
              class="menuBtn"
              :style="
                this_route === item.path ? { color: 'white' } : { color: item.color }
              "
              v-for="(item, index) in route_links"
              :key="index"
              :to="item.path"
            >
              {{ item.name }}
            </q-btn>
            <q-btn icon="logout" dark no-caps color="grey-6" @click="logout" flat>
              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                Logout
              </q-tooltip>
            </q-btn>
          </div>
        </q-toolbar>
        <q-toolbar glossy v-else>
          <div style="margin-left: 5%; display: flex">
            <q-btn
              no-caps
              flat
              class="menuBtnIV"
              :style="
                this_route === item.path ? { color: 'white' } : { color: item.color }
              "
              v-for="(item, index) in investor_view_links"
              :key="index"
              :to="item.path"
            >
              {{ item.name }}
            </q-btn>
            <q-btn icon="logout" dark no-caps color="grey-6" @click="logout" flat>
              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                Logout
              </q-tooltip>
            </q-btn>
          </div>
        </q-toolbar>
      </div>
    </div>
    <!-- <chat-bot /> -->
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, onBeforeUnmount, watchEffect } from "vue";
import { useUserStore } from "../stores/userStore";
// import chatBot from "../components/Chat-Bot.vue";

const route = useRoute();
const router = useRouter();
const store = useUserStore();

let this_route = route.path;

const screen_width = ref(window.innerWidth);

const handleResize = () => {
  screen_width.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

const logout = () => {
  store.email = "";
  store.token = "";
  store.name = "";
  store.surname = "";
  store.role = "";
  store.investor_id = "";
  store.loggedIn = false;
  store.investor_view = false;
  store.investor_acc_number = "";
  router.push("/");
};

let investor_view_links = [
  {
    path: `/admin/useraccounts/${store.investor_acc_number}`,
    name: "Dashboard",
    icon: "mdi-account-group",
    color: "grey",
    isActive: true,
  },
  // {
  //   // path: `/admin/useraccountsdetail/${store.investor_acc_number}`,
  //   path: `/admin/useraccountsdetail/${store.current_investment_viewed}`,
  //   name: "Investments",
  //   icon: "mdi-account-group",
  //   color: "grey",
  //   isActive: false,
  // },
  {
    path: `/admin/useraccountsdetail/${store.investor_acc_number}`,
    // path: `/admin/useraccountsdetail/${store.current_investment_viewed}`,
    name: "Investments",
    icon: "mdi-account-group",
    color: "grey",
    isActive: true,
  },
  {
    path: `/admin/useraccounts/investor/${store.investor_acc_number}`,
    name: "Investment List",
    icon: "mdi-account-group",
    color: "grey",
    isActive: true,
  },
  {
    path: `/admin/loanagreements/${store.investor_acc_number}`,
    name: "Agreements",
    icon: "mdi-account-group",
    color: "grey",
    isActive: true,
  },

  {
    path: `/admin/otherdocuments/${store.investor_acc_number}`,
    // name: "Uploaded Docs",
    name: "Documents",
    // name: "POP's / Attorney Docs",
    icon: "mdi-account-group",
    color: "grey",
    isActive: true,
  },
  {
    path: "/admin",
    name: "Back to Admin Dashboard",
    icon: "mdi-account-group",
    color: "white",
    isActive: true,
  },
];

if (store.role === "INVESTOR") {
  investor_view_links = investor_view_links.filter((item) => item.path !== "/admin");
}

let route_links = [
  {
    path: "/admin",
    name: "Dashboard",
    icon: "mdi-account-group",
    color: "grey",
    isActive: false,
  },
  {
    path: "/admin/investors",
    name: "Investors",
    icon: "mdi-account-group",
    color: "grey",
    isActive: true,
  },
  {
    path: "/admin/investments",
    name: "Investments",
    icon: "mdi-account-group",
    color: "grey",
    isActive: false,
  },
  {
    path: "/admin/opportunities",
    name: "Opportunities",
    icon: "mdi-account-group",
    color: "grey",
    isActive: false,
  },
  {
    path: "/admin/users",
    name: "Users",
    icon: "mdi-account-group",
    color: "grey",
    isActive: false,
  },
];

if (store.name !== "WayneAdmin" && store.name !== "Wayne" && store.name !== "Debbie") {
  route_links = route_links.filter((item) => item.path !== "/admin/users");
}
</script>

<style scoped>
.menuBtn {
  width: 50%;
  font-size: 110%;
  /* font-weight: bold; */
  margin: 5px 12px;
  cursor: pointer;
}
.menuBtnIV {
  width: 50%;
  font-size: 110%;
  /* font-wei0ght: bold; */
  margin: 5px 12px;
  cursor: pointer;
}
.img-first {
  /* width: 120px; */
  width: 10%;
  margin-left: 5%;
  margin-bottom: 1%;
}
.sticky-element {
  position: sticky;
  top: 0; /* the element will become fixed once it reaches the top of the viewport */
  /* background-color: #fff; */
  z-index: 1;
}

@media (max-width: 1023px) {
  .img-first {
    width: 30%;
  }
}
</style>
