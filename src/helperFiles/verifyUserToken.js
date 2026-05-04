import { useRouter, useRoute } from "vue-router";

import { useUserStore } from "../stores/userStore";
import { ref } from "vue";
import nodeService from "../services/nodeService";
export default function verifyUser() {
  const router = useRouter();
  const store = useUserStore();
  const route = useRoute();
  let data = {
    token: store.token,
  };

  // return api()
  const verifyUserToken = async () => {
  await nodeService.verifyUserToken(data).then((response) => {
    if (!response.data.tokenValid) {
      store.email = "";
      store.token = "";
      store.name = "";
      store.surname = "";
      store.role = "";
      store.investor_id = "";
      store.loggedIn = false;
      router.push("/");
    } 
    // else {
    //   console.log("Token IS Valid")
    // }
  });
  };

verifyUserToken()

    // .post(`/verifyTokenPortal`, data)
    // .then((response) => {
    //   // console.log("Response",response.data)
    //   // console.log("route",route.fullPath)
    //   if (!response.data.tokenValid) {
    //     // console.log("Token Not Valid")
    //     // console.log("route",route.fullPath)
    //     userStore.SIGN_OUT();
    //     router.push("/");
    //   } else {
    //     // console.log("Token IS Valid")
    //     // if (router.currentRoute)
    //     // console.log(router.currentRoute.value.name)
    //     let currentRoute;
    //     if (router.currentRoute._rawValue.fullPath !== "/") {
    //       currentRoute = router.currentRoute.value.name.split("-")[0];
    //       // console.log("currentRoute", currentRoute)
    //     }
    //     let filtered = userStore.user.linksAuthorised.filter((el) => {
    //       return el === currentRoute;
    //     });
    //     // console.log("Authorised",store.state.user.linksAuthorised)
    //     // console.log("filtered",filtered)
    //     if (filtered.length === 0) {
    //       router.push("/");
    //       // console.log(filtered)
    //     }
    //   }
    // });
}
