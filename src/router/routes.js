const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),

    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/admin",
        component: () => import("pages/AdminHome.vue"),
      },
      {
        path: "/admin/opportunities",
        component: () => import("pages/AdminOpportunities.vue"),
      },
      {
        path: "/admin/investors",
        component: () => import("pages/AdminInvestors.vue"),
      },
      {
        path: "/admin/investments",
        component: () => import("pages/AdminInvestments.vue"),
      },
      {
        path: "/admin/investments/investor/:id",
        name: "admininvestmentsinvestor",
        component: () => import("pages/AdminInvestmentsInvestor.vue"),
      },
      {
        path: "/admin/useraccounts/investor/:id",
        name: "adminuseraccountsinvestmentsinvestor",
        component: () => import("pages/AdminInvestmentsInvestor.vue"),
      },
      {
        path: "/admin/statements/:id/:opportunity_code/:investment_number",
        name: "adminStatements",
        component: () => import("pages/AdminStatements.vue"),
      },
      {
        path: "/investorhome",
        component: () => import("pages/InvestorHome.vue"),
      },
      {
        path: "/admin/useraccounts/:id",
        name: "adminuseraccounts",
        component: () => import("pages/AdminUserAccount.vue"),
      },
      {
        path: "/admin/useraccountsdetail/:id",
        name: "adminuseraccountsdetail",
        component: () => import("pages/AdminUserAccountDetail.vue"),
      },
      {
        path: "/admin/loanagreements/:id",
        name: "userloanagreements",
        component: () => import("pages/AdminLoanAgreements.vue"),
      },
      {
        path: "/admin/otherdocuments/:id",
        name: "userotherdocuments",
        component: () => import("pages/AdminOtherDocuments.vue"),
      },
      {
        path: "/admin/users",
        name: "users",
        component: () => import("pages/AdminUsers.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
