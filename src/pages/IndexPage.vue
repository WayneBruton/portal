<template>
  <q-page class="bg-image" :class="{ vibrating: isVibrating }">
    <div class="row">
      <div
        class="col-12 col-md-4 col-lg-4 col-xl-4"
        style="background-color: rgba(0, 0, 0, 0.7); height: 100vh"
      >
        <q-form>
          <div
            v-if="!changePwd"
            style="
              margin-top: 20%;
              margin-left: 20px;
              margin-right: 20px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            "
          >
            <span class="signin"
              ><strong>Please Note:</strong> This section only available to past and
              present investment clients who have been granted access.</span
            >

            <span class="signin" style="font-size: 20px"><strong>Sign In</strong></span>

            <span class="signin" style="color: rgb(181, 177, 177)"
              >Enter your email address and password to access account.</span
            >

            <span class="signin"><strong>E-Mail Address</strong></span>

            <span class="signin" style="color: red" v-if="incorrect_details"
              ><strong>Your email address or password is incorrect.</strong></span
            >
            <span class="signin" style="color: red" v-if="all_details_required"
              ><strong>Both Email and Pasword are required.</strong></span
            >

            <q-input
              dense
              color="black"
              class="signin que-input"
              type="email"
              :dark="false"
              v-model="email"
              placeholder="  Enter your email"
              autocomplete="email"
              name="email"
            />

            <div class="signin" style="display: flex; justify-content: space-between">
              <span style="margin: 3px 0px"><strong>Password</strong></span
              ><q-btn
                no-caps
                color="red"
                flat
                style="margin: 1px 0px"
                @click="forgotPassword"
                ><strong><small>Forgot / Change your Password?</small></strong></q-btn
              >
            </div>

            <q-input
              v-model="password"
              color="black"
              name="password"
              filled
              dense
              class="signin que-input"
              :type="isPwd ? 'password' : 'text'"
              :dark="false"
              placeholder="Enter your password"
              autocomplete="current-password"
            >
              <template v-slot:append>
                <q-icon
                  :name="!isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-btn class="signin mainBtn" label="Sign In" @click="loginToPortal" />
          </div>
          <div
            v-else
            style="
              margin-top: 20%;
              margin-left: 20px;
              margin-right: 20px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            "
          >
            <span class="signin" style="color: rgb(181, 177, 177)"
              >Enter your email address to change or reset your password.</span
            >

            <span class="signin"><strong>E-Mail Address</strong></span>

            <span class="signin" style="color: red" v-if="incorrect_details"
              ><strong
                >Your email address is incorrect. Please try again or contact
                admin.</strong
              ></span
            >
            <span class="signin" style="color: red" v-if="all_details_required"
              ><strong>Email is required.</strong></span
            >

            <q-input
              class="signin que-input"
              v-model="emailToCheck"
              :dark="false"
              placeholder="  Enter your email"
              autocomplete="email"
              name="email"
              dense
              color="black"
            >
              <template v-slot:before>
                <q-icon name="email" />
              </template>

              <template v-slot:after>
                <q-btn round dense flat icon="send" @click="checkEmailAddress" />
              </template>
            </q-input>

            <div
              class="signin"
              style="
                display: flex;
                justify-content: space-between;
                flex-direction: column;
              "
              v-if="email_verified && otp_correct === false"
            >
              <q-radio
                v-model="method"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="email"
                :label="radioEmailLabel"
                color="yellow"
              />
              <q-radio
                v-if="radioSMSLabel !== 'SMS: '"
                v-model="method"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="SMS"
                :label="radioSMSLabel"
                color="yellow"
              />
            </div>

            <q-btn
              class="signin mainBtn"
              label="Get One Time pin (OTP)"
              :disable="button_disabled"
              v-if="email_verified && otp_correct === false"
              @click="getOTP"
            />

            <div v-if="otp_received !== '' && otp_correct === false">
              OTP Expires in {{ otp_time_show }}
            </div>

            <q-input
              v-if="otp_received !== '' && otp_correct === false"
              dense
              color="black"
              class="signin que-input"
              type="number"
              :dark="false"
              v-model="otp"
              placeholder="  Enter your OTP"
              @update:model-value="checkOTP"
            >
              <template v-slot:before>
                <q-icon name="pin" />
              </template>
              <!-- <template v-slot:after>
                <q-btn round dense flat icon="send" @click="checkOTP" />
              </template> -->
            </q-input>

            <q-input
              v-if="otp_correct"
              v-model="newpassword"
              color="black"
              name="password"
              filled
              dense
              class="signin que-input"
              :type="isPwd ? 'password' : 'text'"
              :dark="false"
              placeholder="Enter password"
              autocomplete="new-password"
            >
              <template v-slot:append>
                <q-icon
                  :name="!isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
              <template v-slot:before>
                <q-icon name="password" />
              </template>
            </q-input>

            <q-input
              v-if="otp_correct"
              v-model="repeatpassword"
              color="black"
              name="password"
              filled
              dense
              class="signin que-input"
              :type="isPwd ? 'password' : 'text'"
              :dark="false"
              placeholder="Re enter password"
              autocomplete="new-password"
            >
              <template v-slot:append>
                <q-icon
                  :name="!isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
              <template v-slot:before>
                <q-icon name="password" />
              </template>
            </q-input>
            <q-btn
              class="signin mainBtn"
              label="Reset Password"
              v-if="newpassword === repeatpassword && newpassword !== ''"
              @click="resetPassword"
            />
          </div>
        </q-form>
      </div>
      <div
        class="col-12 col-md-8 col-lg-8 col-xl-8"
        style="height: 100vh; display: flex; justify-content: center; align-items: center"
      >
        <q-img src="../assets/logo-light.png" style="width: 32%" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useQuasar } from "quasar";
import nodeService from "../services/nodeService";
import pythonService from "../services/pythonService";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";
import axios from "axios";

const $q = useQuasar();
const store = useUserStore();
const router = useRouter();

$q.dark.set(true);

const method = ref("email");
const remember = ref(false);
const email = ref("");
const password = ref("");
const incorrect_details = ref(false);
const all_details_required = ref(false);
const isVibrating = ref(false);
const isPwd = ref(true);

const changePwd = ref(false);
const emailToCheck = ref("");

const email_verified = ref(false);

const radioEmailLabel = ref("Email");
const radioSMSLabel = ref("SMS");
const id_toChange_password = ref("");

const checkEmailAddress = async () => {
  // all_details_required.value = false;
  let data = {
    email: emailToCheck.value,
  };
  const response = await nodeService.checkUserEmail(data);

  if (response.data.user_exists === false) {
    email_verified.value = false;
  } else {

    email_verified.value = true;
    id_toChange_password.value = response.data._id;
    radioEmailLabel.value = `Email: ${response.data.email}`;
    // radioSMSLabel.value = `SMS: COMING SOON`;
    radioSMSLabel.value = `SMS: ${response.data.mobile}`;
    
  }
};

const otp = ref(null);
const otp_received = ref("");
const otp_correct = ref(false);
const button_disabled = ref(false);

const getOTP = async () => {
  try {
    // otp_received.value = "123456";
    let data = {
      method: method.value,
      email: radioEmailLabel.value,
      mobile: radioSMSLabel.value,
    };
    button_disabled.value = true;

    await pythonService
      .generateOTP(data)
      .then(
        (response) => {
          otp_received.value = response.data.otp;
          otp_time.value = 60 * 20;
          timer;
          $q.notify({
            color: "positive",
            message: "OTP sent successfully",
            position: "top",
            icon: "check_circle",
          });
        },
        (error) => {
          console.error(error);
          $q.notify({
            color: "negative",
            message: "Error in sending OTP",
            position: "top",
            icon: "report_problem",
          });
          button_disabled.value = false;
          clearInterval(interval_call);
        }
      )
      .catch((error) => {
        console.error(error);
        $q.notify({
          color: "negative",
          message: "Error in sending OTP",
          position: "top",
          icon: "report_problem",
        });
        button_disabled.value = false;
        clearInterval(interval_call);
      });
  } catch (error) {
    console.error(error);
  }
};

const checkOTP = async () => {
  if (otp.value === otp_received.value) {
    otp_correct.value = true;

    clearInterval(timer);
  } else {
    otp_correct.value = false;
  }
};

let otp_time = ref(null);
let otp_time_show = ref("");

const minutes = computed(() => {
  return Math.floor(otp_time.value / 60);
});

const seconds = computed(() => {
  return otp_time.value % 60;
});

watch(otp_time, (newValue, oldValue) => {
  if (newValue !== oldValue && newValue >= 0) {
    setTimeout(() => {
      otp_time.value -= 1;
      otp_time_show.value = `${minutes.value}:${seconds.value}`;
    }, 1000);
  }
});

// const timer = setInterval(() => {
//   if (otp_time.value > 0) {
//     otp_time.value--;
//   } else {
//     clearInterval(timer);
//   }
// }, 1000);

// do timer function using minutes and seconds
const timer = setInterval(() => {
  if (otp_time.value > 0) {
    otp_time.value--;
    let minutes = Math.floor(otp_time.value / 60);
    let seconds = otp_time.value % 60;
    otp_time_show.value = `${minutes}:${seconds}`;
  } else {
    clearInterval(timer);
    button_disabled.value = false;
  }
}, 1000);

const newpassword = ref("");
const repeatpassword = ref("");

const resetPassword = async () => {
  let data = {
    id: id_toChange_password.value,
    email: emailToCheck.value,
    password: newpassword.value,
  };

  changePwd.value = false;
  const response = await nodeService.changeUserPassword(data);

  if (response.data.password_reset === true) {
    $q.notify({
      message: "Password reset successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
    changePwd.value = false;
    emailToCheck.value = "";
    newpassword.value = "";
    repeatpassword.value = "";
    // router.push("/login");
  } else {
    $q.notify({
      message: "Password reset failed - please try again later",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  }
};

const forgotPassword = () => {
  password.value = "";
  emailToCheck.value = email.value;
  changePwd.value = true;
};

// If in development mode, set email.value to wayne@opportunity.co.za and password to 12071994Wb! else set to empty strings
if (process.env.NODE_ENV === "development") {
  email.value = "wayne@opportunity.co.za";
  password.value = "12071994Wb!";
} else {
  email.value = "";
  password.value = "";
}

const loginToPortal = async () => {
  if (email.value === "" || password.value === "") {
    all_details_required.value = true;
    isVibrating.value = !isVibrating.value;
    setTimeout(() => {
      isVibrating.value = false;
      all_details_required.value = false;
    }, 1000);
    return;
  }
  let data = {
    email: email.value,
    password: password.value,
  };
  await nodeService.loginToPortal(data).then((response) => {
    if (response.data.password || response.data.emailUsed) {
      incorrect_details.value = true;
      isVibrating.value = !isVibrating.value;
      store.email = "";
      store.token = "";
      store.name = "";
      store.surname = "";
      store.role = "";
      store.investor_id = "";
      store.loggedIn = false;
      store.investor_acc_number = "";
      store.investor_view = false;
      email.value = "";
      password.value = "";
      store.current_investment_viewed = "";

      setTimeout(() => {
        isVibrating.value = false;
        incorrect_details.value = false;
      }, 1000);
      return;
    } else {
      store.email = response.data.email;
      store.token = response.data.token;
      store.name = response.data.name;
      store.surname = response.data.surname;
      store.role = response.data.role;
      store.investor_id = response.data.investor_id;
      store.loggedIn = true;
      store.investor_acc_number = response.data.investor_acc_number;
      store.current_investment_viewed = "";
      if (store.investor_acc_number !== "") {
        store.investor_view = true;
      }

      setTimeout(() => {
        if (store.role === "INVESTOR") {
          router.push(`/admin/useraccounts/${store.investor_acc_number}`);
        } else {
          router.push("/admin");
        }
      }, 1000);
    }
  });
};
</script>

<style scoped>
.bg-image {
  background-image: url("../assets/skyline.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.signin {
  margin: 10px 15px;
}
.que-input {
  background-color: #f5f5f5;
  /* border: 1px solid #F5F5F5; */
  border-radius: 5px;
}

.mainBtn {
  background-color: #b67f23; /* fallback color */
  background-image: linear-gradient(to right, #b67f23, #dec47c 50%, #b47c1e);
  color: #fff;
}

a {
  text-decoration: none; /* remove underline */
  color: rgb(181, 177, 177); /* change color */
}

@keyframes vibration {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(-2px, -2px);
  }
  50% {
    transform: translate(0, 0);
  }
  75% {
    transform: translate(2px, 2px);
  }
  100% {
    transform: translate(0, 0);
  }
}
.vibrating {
  animation: vibration 0.2s linear infinite;
}
</style>
