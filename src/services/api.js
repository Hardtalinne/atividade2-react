import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  params: {
    ts: "1",
    apikey: process.env.REACT_APP_API_PUBLIC_KEY,
    hash: process.env.REACT_APP_API_HASH,
  },
});
