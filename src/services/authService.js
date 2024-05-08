import axios from "axios";
import { HOST_SEVER_AUTH } from "./constant";
export async function isAuthenticated() {
  const token = localStorage.getItem("token");

  if (token === "undefined" || token === null) {
    return false;
  }
  const res = await checkOutToken({ token: token });
  if (res.status === 401 || res.status === 403) {
    return false;
  }
  return true;
}
export async function checkOutToken(
  form = { token: localStorage.getItem("token") }
) {
  axios.defaults.headers["Authorization"] = "Bearer " + form.token;
  const res = await axios.post(HOST_SEVER_AUTH + "/checkout-token", form);
  return res.data;
}
export async function loginService(formLogin) {
  const res = await axios.post(`${HOST_SEVER_AUTH}/admin/login`, formLogin);
  return res.data.payload;
}
export async function logoutService() {
  const res = await axios.post(`${HOST_SEVER_AUTH}/logout`);
  return res.data;
}
