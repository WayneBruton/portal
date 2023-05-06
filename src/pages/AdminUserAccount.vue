<template>
  <q-page>
    <std-header />
    <br />
    <MarqueeText duration="35" style="margin-bottom: 15px" v-if="stock_market.length > 0">
      <q-chip
        :square="square"
        :dense="dense"
        v-for="(item, index) in store.stock_market"
        :key="index"
        :style="getItemStyle(item.color)"
      >
        {{ item.Description }}: {{ item.price }}
        <q-icon size="md" :name="item.icon" :color="item.icon_color" />
      </q-chip>
    </MarqueeText>
    <MarqueeText duration="10" style="margin-bottom: 15px; width: 100vw" v-else>
      <q-chip :square="square" :dense="dense" style="background: #e7d4a0; color: black">
        Market info coming!
      </q-chip>
      <q-chip :square="square" :dense="dense" style="background: #b47b1d; color: white">
        Market info coming!
      </q-chip>
      <q-chip :square="square" :dense="dense" style="background: #e7d4a0; color: black">
        Market info coming!
      </q-chip>
      <q-chip :square="square" :dense="dense" style="background: #b47b1d; color: white">
        Market info coming!
      </q-chip>
      <q-chip :square="square" :dense="dense" style="background: #e7d4a0; color: black">
        Market info coming!
      </q-chip>
      <q-chip :square="square" :dense="dense" style="background: #b47b1d; color: white">
        Market info coming!
      </q-chip>
    </MarqueeText>

    <div class="row">
      <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-1"></div>
      <div class="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
        <!-- <MarqueeText
          duration="35"
          style="margin-bottom: 5px"
          v-show="stock_market.length > 0"
        >
          <q-chip
            :square="square"
            :dense="dense"
            v-for="(item, index) in store.stock_market"
            :key="index"
            :style="getItemStyle(item.color)"
          >
            {{ item.Description }}: {{ item.price }}
            <q-icon size="md" :name="item.icon" :color="item.icon_color" />
          </q-chip>
        </MarqueeText> -->
        <!-- background: radial-gradient(circle, #e7d4a0 0%, #b47b1d 100%); -->
        <q-card
          class="my-card text-white"
          style="height: 100%; border: 1px solid #e7d4a0"
        >
          <q-card-section>
            <div class="text-h6" style="text-align: center">Investment Summary</div>
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
      <div class="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 q-pa-md q-gutter-md">
        <q-card class="my-card text-white my-card-header">
          <q-card-section>
            <div
              class="row text-white my-card myCardDetail"
              v-for="(dev, index) in development_data"
              :key="index"
            >
              <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 summaryDataMain">
                <div>
                  <div class="text-h6">Account: {{ dev.investor_acc_number }}</div>
                  <div style="font-size: 120%; font-wight: bold">
                    {{ dev.investment_name }}
                  </div>
                </div>
              </div>

              <div class="col-1 col-sm-0 col-md-1 col-lg-1 col-xl-1"></div>
              <div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 summaryDataMain">
                <q-btn
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
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, computed, watchEffect } from "vue";
import { useQuasar } from "quasar";
import nodeService from "../services/nodeService";
import { useUserStore } from "../stores/userStore";
import { useRouter, useRoute } from "vue-router";
import stdHeader from "../components/StdHeader.vue";
import verifyUser from "src/helperFiles/verifyUserToken";
import MarqueeText from "vue-marquee-text-component";
import axios from "axios";

verifyUser();

const $q = useQuasar();
const store = useUserStore();
const router = useRouter();
const route = useRoute();

const url = ref(
  process.env.DEV ? "http://localhost:3000" : "https://opportunity.eu-4.evennode.com"
);

const urlPython = ref(
  process.env.DEV ? "http://localhost:8000" : "https://omh-python.herokuapp.com"
);

const get_stock_data = async () => {
  try {
    stock_market.value = store.stock_market;

    const response = await axios.get(`${urlPython.value}/stock_market`);
    // console.log("XXXX", response.data);
    stock_market.value = [];
    stock_market.value = response.data.stock_market;
    store.stock_market = response.data.stock_market;
  } catch (error) {
    console.log(error);
  }
};

// console.log(store.stock_market);
// console.log(store.stock_market.length);

onBeforeMount(() => {
  store.current_investment_viewed = "";
  store.files = [];
  store.loanAgreements = [];

  get_stock_data();
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

// get_stock_data every 15 seconds
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
    str.splice(12, 0, ",");
  }
  if (str.length > 9) {
    str.splice(9, 0, ",");
  }
  if (str.length > 6) {
    str.splice(6, 0, ",");
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
      // insert[el.key] = el.value;
    });

    store.files = files;
    store.loanAgreements = loanAgreements;
  } catch (error) {
    console.error(error);
  }
};

onBeforeMount(() => {
  getInvestorDocs();
});
// getInvestorDocs();

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

    response.data = response.data.filter((el) => {
      return el.amount_invested !== "CLOSED";
    });

    data_from_db.value = response.data;

    capital.value = data_from_db.value.reduce((acc, el) => {
      return acc + parseFloat(el.amount_invested);
    }, 0);

    total.value = data_from_db.value.reduce((acc, el) => {
      return acc + parseFloat(el.balance);
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

const getCurrentInvestorSummary = (e) => {
  store.current_investment_viewed = e;
  router.push({
    name: "adminuseraccountsdetail",
    params: {
      id: e,
    },
  });
};

get_info();

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
  margin: 15px 15px;

  /* background: #3c3c3c; */
  padding: 10px;
}

.summaryDataBtns {
  margin: 12px 2px;
}

.summaryDataChild {
  background-color: #d6b674;
  border: 1px solid #e4cf95;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  padding: 5px;
}

@media (max-width: 1023px) {
  .summaryDataMain {
    text-align: center;
  }

  .myCardDetail {
    margin: 10px 2px;
  }

  .summaryDataBtns {
    margin: 8px 2px;
  }
}
</style>
