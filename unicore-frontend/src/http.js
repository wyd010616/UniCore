import axios from "axios";

const instance = axios.create({
  baseURL: "http://3.16.36.2:18000",
});

export default instance;
