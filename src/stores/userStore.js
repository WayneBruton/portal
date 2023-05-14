import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    counter: 66,
    email: "",
    mobile: "",
    name: "",
    surname: "",
    investor_acc_number: "",
    investor_id: "",
    role: "",
    token: "",
    loggedIn: false,
    investor_view: false,
    current_investment_viewed: "",
    files: [],
    loanAgreements: [],
    stock_market: [],
    display_data: {},
    summary_data: "",
  }),
  persist: true,
  // getters: {
  //   doubleCount: (state) => state.counter * 2,
  // },
  // actions: {
  //   increment() {
  //     this.counter++;
  //   },
  // },
});
