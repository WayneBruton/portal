import api from "./nodeApi";

export default {
  getOpportunityCategories() {
    return api().post("/opportunityCategories");
  },
  loginToPortal(data) {
    return api().post("/loginPortal", data);
  },
  verifyUserToken(data) {
    return api().post("/verifyTokenPortal", data);
  },
  adminDashboard() {
    return api().post("/getAdminDashboardData");
  },
  adminOpportunities() {
    return api().post("/getAdminOpportunitiesData");
  },
  getInvestors() {
    return api().post("/getAdminInvestorsData");
  },
  getInvestments(data) {
    return api().post("/getAdminInvestmentsData", data);
  },
  getInvestorStatement(data) {
    return api().post("/getUserStatementForPortal", data);
  },
  checkUserEmail(data) {
    return api().post("/checkUserEmail", data);
  },
  changeUserPassword(data) {
    return api().post("/change_user_password", data);
  },
  addInvestorToPortal(data) {
    return api().post("/add_investor", data);
  },
  getInvestorDocs(data) {
    return api().post("/get_investor_docs", data);
  },
  getAdminUsers() {
    return api().post("/getAdminUsers");
  },
  addAdminUser(data) {
    return api().post("/addAdminUser", data);
  },
  deleteAdminUser(data) {
    return api().post("/deleteAdminUser", data);
  },
};
