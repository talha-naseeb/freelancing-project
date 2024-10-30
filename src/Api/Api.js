import axios from "axios";

const BASE_URL = "https://api-test.nanalaha.com";

export default axios.create({
  baseURL: BASE_URL,
});
