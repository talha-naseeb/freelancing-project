import axios from "axios";

const BASE_URL = "https://api-dev.acquireitsol.com";

export default axios.create({
  baseURL: BASE_URL,
});
