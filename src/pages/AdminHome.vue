<template>
  <q-page>
    <std-header />
    <br /><br />

    <div class="row">
      <div class="col-1"></div>
      <div class="col">
        <!-- style="
            background: radial-gradient(circle, #e7d4a0 0%, #b47b1d 100%);
            height: 100%;
          " -->
        <q-card
          class="my-card text-white"
          style="height: 100%; border: 1px solid #e7d4a0"
        >
          <q-card-section>
            <div class="text-h6" style="text-align: center">Admin Dashboard</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="row">
              <div
                class="col-12 summaryDataMain col-md-3"
                v-for="(item, index) in summary_data"
                :key="index"
              >
                <div class="summaryDataChild">{{ item.title }}{{ item.value1 }}</div>
                <div class="summaryDataChild">{{ item.subtitle }}{{ item.value2 }}</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-1"></div>
    </div>
    <br /><br />
    <div class="row">
      <div class="col-1"></div>
      <div class="col">
        <q-card class="my-card text-white" style="margin: 10px 10px; padding: 0px">
          <q-card-section class="q-pt-none">
            <q-card
              class="my-card text-white"
              v-for="(dev, index) in development_data"
              :key="index"
              style="
                margin: 10px 0px;
                background: #3c3c3c;
                padding: 00px;
                border: 1px solid #e7d4a0;
              "
            >
              <br />
              <q-card-section>
                <div class="text-h5">{{ dev.development }}</div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <div class="row">
                  <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-first">
                    <div class="summaryDetail">Investment Requirement</div>
                  </div>
                  <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-fourth">
                    <div class="summaryDetail">Current Investment</div>
                  </div>
                  <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-fifth">
                    <div class="summaryDetail">Shortfall</div>
                  </div>
                  <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-sixth">
                    <div class="summaryDetail">Total Investments</div>
                  </div>

                  <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-second">
                    <div class="summaryDetail">
                      {{ dev.investment_required }}
                    </div>
                  </div>
                  <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-seventh">
                    <div class="summaryDetail">
                      {{ dev.current_investment_value }}
                    </div>
                  </div>
                  <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-eighth">
                    <div class="summaryDetail">
                      {{ dev.investment_shortfall }}
                    </div>
                  </div>
                  <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-nineth">
                    <div class="summaryDetail">
                      {{ dev.total_investments }}
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-1"></div>
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

verifyUser();

const $q = useQuasar();
const store = useUserStore();
const router = useRouter();

const summary_data = ref([]);

const development_data = ref([]);

store.investor_view = false;
store.investor_acc_number = "";

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

const get_info = async () => {
  try {
    const response = await nodeService.adminDashboard();

    response.data.summary_data.forEach((el, index) => {
      if (index > 0) {
        if (el.value1 !== "") {
          el.value1 = el.value1.toFixed(2);
          el.value1 = convertToString(el.value1);
        }
        if (el.value2 !== "") {
          el.value2 = el.value2.toFixed(2);
          el.value2 = convertToString(el.value2);
        }
      }
    });
    summary_data.value = response.data.summary_data;
    response.data.development_data.forEach((el) => {
      el.investment_required = convertToString(el.investment_required);
      el.current_investment_value = convertToString(el.current_investment_value);
      el.investment_shortfall = convertToString(el.investment_shortfall);
      el.total_investments = el.total_investments.toFixed(0);
    });
    development_data.value = response.data.development_data;
  } catch (error) {
    console.error(error);
  }
};

// onBeforeMount(() => {
get_info();
// });

$q.dark.set(true);
</script>

<style scoped>
.my-card {
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}
.summaryDataMain {
  background-color: #887238;
  border: 1px solid #cfac67;
  /* background-color: #d6b674;
  border: 1px solid #e4cf95; */
}

.summaryDataChild {
  background-color: #d6b674;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  padding: 5px;
}
.summaryDetail {
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  padding: 5px;
  background: #444444;
  margin: 5px 10px;
}

@media (max-width: 1023px) {
  .col-first {
    order: 1;
  }
  .col-second {
    order: 2;
  }
  .col-third {
    order: 3;
  }
  .col-fourth {
    order: 4;
  }
  .col-fifth {
    order: 6;
  }
  .col-sixth {
    order: 8;
  }
  .col-seventh {
    order: 5;
  }
  .col-eighth {
    order: 7;
  }
  .col-nineth {
    order: 9;
  }
}
</style>
