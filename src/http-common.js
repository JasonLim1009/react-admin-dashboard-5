import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.0.34:8080/React_web/",
  headers: {
    "Content-type": "application/json",
  },
});


// "http://evantage.ddns.net/React_web/"