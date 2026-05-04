<template>
  <q-page class="bg-image" :class="{ vibrating: isVibrating }">
    <div class="row">
      <div
        class="col-12 col-md-4"
        style="background-color: rgba(0, 0, 0, 0.7); height: 100vh"
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
            INVESTOR HOME
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
              dark="false"
              dense
              color="white"
              class="signin que-input"
              type="email"
              v-model="email"
              placeholder="  Enter your email"
              autocomplete="email"
            />

            <div class="signin" style="display: flex; justify-content: space-between">
              <span><strong>Password</strong></span
              ><a href="fgfgsf"
                ><strong><small>Forgot your Password?</small></strong></a
              >
            </div>

            <q-input
              dark="false"
              dense
              color="white"
              class="signin que-input"
              outlined
              type="password"
              v-model="password"
              placeholder="Enter your password"
              autocomplete="current-password"
            />

            <q-checkbox
              color="amber"
              class="signin"
              label="Remember Me"
              v-model="remember"
              checked="false"
              style="width: 150px"
            />

            <q-btn class="signin mainBtn" label="Sign In" @click="loginToPortal" />
          </div>
        </q-form>
      </div>
      <div
        class="col-12 col-md-8"
        style="height: 100vh; display: flex; justify-content: center; align-items: center"
      >
        <q-img src="../assets/logo-light.png" style="width: 32%" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import nodeService from "../services/nodeService";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const $q = useQuasar();
const store = useUserStore();
const router = useRouter();

$q.dark.set(true);

const remember = ref(false);
const email = ref("");
const password = ref("");
const incorrect_details = ref(false);
const all_details_required = ref(false);
const isVibrating = ref(false);

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
      email.value = "";
      password.value = "";
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
      setTimeout(() => {
        router.push("/dashboard");
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
