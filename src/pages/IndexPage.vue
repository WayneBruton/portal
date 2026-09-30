<template>
  <q-page class="bg-image" :class="{ vibrating: isVibrating }">
    <div class="row">
      <div
        class="col-12 col-md-4 col-lg-4 col-xl-4"
        style="background-color: rgba(0, 0, 0, 0.7); min-height: 100vh"
      >
        <q-form>
          <div
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

            <span class="signin" style="font-size: 20px" v-if="!changePwd"
              ><strong>Sign In</strong></span
            >

            <span class="signin" style="color: rgb(181, 177, 177)" v-if="!changePwd"
              >Enter your email address and password to access account.</span
            >

            <span class="signin" style="font-size: 20px" v-if="changePwd"
              ><strong>Reset Password</strong></span
            >

            <span class="signin" style="color: rgb(181, 177, 177)" v-if="changePwd"
              >Follow the steps below to reset your password.</span
            >

            <span class="signin" style="color: red" v-if="incorrect_details"
              ><strong>Your email address or password is incorrect.</strong></span
            >
            <span class="signin" style="color: red" v-if="all_details_required"
              ><strong>Both Email and Password are required.</strong></span
            >
            <span class="signin" style="color: red" v-if="reset_error"
              ><strong>{{ reset_error }}</strong></span
            >

            <div v-if="!changePwd">
              <span class="signin"><strong>E-Mail Address</strong></span>

              <q-input
                dense
                color="black"
                class="signin que-input"
                type="email"
                :dark="false"
                v-model="email"
                @update:model-value="email = ($event || '').toLowerCase()"
                placeholder="  Enter your email"
                autocomplete="email"
                name="email"
              />

              <div class="signin" style="display: flex; justify-content: space-between">
                <span style="margin: 3px 0px"><strong>Password</strong></span>
                <div>
                  <q-btn
                    no-caps
                    color="red"
                    flat
                    style="margin: 1px 0px"
                    @click="startResetFlow"
                    ><strong><small>Forgot / Change your Password?</small></strong></q-btn
                  >
                  <q-tooltip
                    v-if="!email"
                    anchor="top middle"
                    self="bottom middle"
                    class="bg-red"
                  >
                    Please enter your email address first
                  </q-tooltip>
                </div>
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

            <!-- Inline password reset flow -->
            <div
              v-if="changePwd"
              class="signin"
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-top: 20px;
              "
            >
              <span class="signin" style="color: rgb(181, 177, 177)"
                >We will send a one-time pin to the email or mobile number linked to
                <strong>{{ emailToCheck }}</strong>.
              </span>

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
                  :label="radioEmailLabelPartial"
                  color="yellow"
                />
                <q-radio
                  v-if="radioSMSLabel !== 'SMS: '"
                  v-model="method"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="SMS"
                  :label="radioSMSLabelPartial"
                  color="yellow"
                >
                  <q-tooltip
                    anchor="center right"
                    self="center left"
                    class="bg-red"
                    :offset="[-100, -50]"
                  >
                    Please check your number (Only RSA numbers at this time)
                  </q-tooltip>
                </q-radio>
              </div>

              <q-btn
                class="signin mainBtn"
                label="Get One Time Pin (OTP)"
                :disable="button_disabled"
                v-if="email_verified && otp_correct === false"
                @click="getOTP"
              />

              <div v-if="otp_sent && otp_correct === false" class="signin">
                OTP Expires in {{ otp_time_show }}
              </div>

              <q-input
                v-if="otp_sent && otp_correct === false"
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
                v-if="newpassword && newpassword === repeatpassword"
                @click="resetPassword"
              />

              <q-btn
                class="signin"
                flat
                color="grey"
                label="Back to Sign In"
                @click="onReset"
              />
            </div>
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

const $q = useQuasar();
const store = useUserStore();
const router = useRouter();

$q.dark.set(true);

const email = ref("");
const password = ref("");
const incorrect_details = ref(false);
const all_details_required = ref(false);
const reset_error = ref("");
const isVibrating = ref(false);
const isPwd = ref(true);

const changePwd = ref(false);
const emailToCheck = ref("");
const email_verified = ref(false);
const method = ref("email");
const userMobile = ref("");

const radioEmailLabel = ref("Email");
const radioSMSLabel = ref("SMS");
const radioEmailLabelPartial = ref("Email");
const radioSMSLabelPartial = ref("SMS");
const id_toChange_password = ref("");

const otp = ref(null);
const otp_sent = ref(false);
const otp_correct = ref(false);
const button_disabled = ref(false);
const otp_time = ref(null);
const otp_time_show = ref("");
let otpTimer = null;

const newpassword = ref("");
const repeatpassword = ref("");

const startOtpTimer = () => {
  stopOtpTimer();
  otp_time.value = 60 * 20;
  otp_time_show.value = "20:00";
  otpTimer = setInterval(() => {
    if (otp_time.value > 0) {
      otp_time.value--;
      const minutes = Math.floor(otp_time.value / 60);
      const seconds = otp_time.value % 60;
      otp_time_show.value = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    } else {
      stopOtpTimer();
      button_disabled.value = false;
      reset_error.value = "OTP has expired. Please request a new one.";
    }
  }, 1000);
};

const stopOtpTimer = () => {
  if (otpTimer) {
    clearInterval(otpTimer);
    otpTimer = null;
  }
};

const maskEmail = (emailAddress) => {
  const parts = emailAddress.split("@");
  if (parts.length !== 2) return emailAddress;
  const [username, domain] = parts;
  const maskedUsername = username.replace(/\S/g, "*");
  return `${maskedUsername}@${domain}`;
};

const maskMobile = (mobile) => {
  if (!mobile) return "";
  const lastThreeDigits = mobile.slice(-3);
  const maskedNumber = mobile.slice(0, -3).replace(/\d/g, "*") + lastThreeDigits;
  return maskedNumber;
};

const checkEmailAddress = async () => {
  reset_error.value = "";
  const data = {
    email: emailToCheck.value,
  };

  try {
    const response = await nodeService.checkUserEmail(data);

    if (response.data.user_exists === false) {
      email_verified.value = false;
      reset_error.value =
        "Your email address is incorrect. Please try again or contact admin.";
      return false;
    }

    email_verified.value = true;
    id_toChange_password.value = response.data._id;
    userMobile.value = response.data.mobile || "";

    radioEmailLabel.value = `Email: ${response.data.email}`;
    radioEmailLabelPartial.value = maskEmail(response.data.email);

    radioSMSLabel.value = `SMS (+27): ${response.data.mobile}`;
    radioSMSLabelPartial.value = `SMS (+27): ${maskMobile(response.data.mobile)}`;
    return true;
  } catch (error) {
    console.error(error);
    reset_error.value = "Could not verify email. Please try again later.";
    return false;
  }
};

const startResetFlow = async () => {
  reset_error.value = "";
  all_details_required.value = false;
  incorrect_details.value = false;

  if (!email.value) {
    reset_error.value = "Please enter your email address first.";
    $q.notify({
      message: "Please enter your email address first.",
      color: "negative",
      position: "top",
      timeout: 3000,
    });
    return;
  }

  emailToCheck.value = email.value;
  password.value = "";
  changePwd.value = true;

  await checkEmailAddress();
};

const getOTP = async () => {
  reset_error.value = "";
  button_disabled.value = true;

  try {
    const data = {
      method: method.value,
      email: radioEmailLabel.value,
      mobile: radioSMSLabel.value,
    };

    await pythonService.generateOTP(data);
    otp_sent.value = true;
    startOtpTimer();
    $q.notify({
      color: "positive",
      message: "OTP sent successfully",
      position: "top",
      icon: "check_circle",
    });
  } catch (error) {
    console.error(error);
    $q.notify({
      color: "negative",
      message: "Error in sending OTP",
      position: "top",
      icon: "report_problem",
    });
    button_disabled.value = false;
  }
};

const checkOTP = async () => {
  reset_error.value = "";
  if (!otp.value || String(otp.value).length !== 6) {
    otp_correct.value = false;
    return;
  }

  try {
    const response = await pythonService.verifyOTP({
      email: emailToCheck.value,
      otp: String(otp.value),
    });

    if (response.data.verified) {
      otp_correct.value = true;
      stopOtpTimer();
      $q.notify({
        position: "top",
        message: "OTP is correct.",
        color: "green",
      });
    } else {
      otp_correct.value = false;
      $q.notify({
        position: "top",
        message: response.data.message || "OTP is incorrect. Please try again.",
        color: "red",
      });
    }
  } catch (error) {
    console.error(error);
    otp_correct.value = false;
    $q.notify({
      position: "top",
      message: "Error verifying OTP. Please try again.",
      color: "red",
    });
  }
};

const resetPassword = async () => {
  if (newpassword.value !== repeatpassword.value || !newpassword.value) {
    $q.notify({
      position: "top",
      message: "Passwords do not match or are blank. Please try again.",
      color: "red",
    });
    return;
  }

  const data = {
    id: id_toChange_password.value,
    email: emailToCheck.value,
    password: newpassword.value,
  };

  try {
    const response = await nodeService.changeUserPassword(data);

    if (response.data.password_reset === true) {
      $q.notify({
        message: "Password reset successfully. Please sign in with your new password.",
        color: "positive",
        position: "top",
        timeout: 3000,
      });
      onReset();
    } else {
      $q.notify({
        message: "Password reset failed - please try again later",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  } catch (error) {
    console.error(error);
    $q.notify({
      message: "Password reset failed - please try again later",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  }
};

const onReset = () => {
  stopOtpTimer();
  password.value = "";
  email.value = "";
  otp.value = null;
  otp_sent.value = false;
  otp_correct.value = false;
  otp_time.value = null;
  otp_time_show.value = "";
  button_disabled.value = false;
  newpassword.value = "";
  repeatpassword.value = "";
  changePwd.value = false;
  emailToCheck.value = "";
  email_verified.value = false;
  reset_error.value = "";
  incorrect_details.value = false;
  all_details_required.value = false;
  method.value = "email";
  radioEmailLabel.value = "Email";
  radioSMSLabel.value = "SMS";
  radioEmailLabelPartial.value = "Email";
  radioSMSLabelPartial.value = "SMS";
  userMobile.value = "";
  id_toChange_password.value = "";
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
  incorrect_details.value = false;
  all_details_required.value = false;
  reset_error.value = "";

  if (email.value === "" || password.value === "") {
    all_details_required.value = true;
    isVibrating.value = !isVibrating.value;
    setTimeout(() => {
      isVibrating.value = false;
      all_details_required.value = false;
    }, 1000);
    return;
  }

  const data = {
    email: email.value,
    password: password.value,
  };

  try {
    const response = await nodeService.loginToPortal(data);

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
      store.current_investment_viewed = "";

      setTimeout(() => {
        isVibrating.value = false;
        incorrect_details.value = false;
      }, 1000);
      return;
    }

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
  } catch (error) {
    console.error(error);
    incorrect_details.value = true;
  }
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
