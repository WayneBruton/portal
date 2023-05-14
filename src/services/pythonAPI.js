import axios from "axios";
import globalVariables from "./globalVariables";

export default () => {
  return axios.create({
    baseURL: globalVariables.value,
    // baseURL: url,
  });
};
