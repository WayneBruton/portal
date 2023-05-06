import axios from "axios";

const url = process.env.DEV
  ? "http://localhost:3000"
  : "https://opportunity.eu-4.evennode.com";

export default () => {
  return axios.create({
    baseURL: url,
  });
};
