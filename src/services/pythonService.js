import api from "./pythonAPI";

export default {
  getStockMarketData() {
    return api().get("/stock_market");
  },
  getChartData(data) {
    return api().post("/getChartData", data);
  },
  addInvestorToPortal(data) {
    return api().post("/add_investor", data);
  },
  create_portal_statement(data) {
    return api().post("/create_portal_statements", data);
  },
  generateOTP(data) {
    return api().post("/generate_otp", data);
  },
};
