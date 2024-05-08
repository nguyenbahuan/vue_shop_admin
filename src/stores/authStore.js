import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {
  loginService,
  logoutService,
  checkOutToken,
} from "@/services/authService";

export const authStore = defineStore("authStore", () => {
  const token = ref(null);
  const user = ref(null);

  const storeLogin = async (formLogin) => {
    const res = await loginService(formLogin);
    user.value = res;
    token.value = res.tokenAccess;
    localStorage.setItem("token", res.tokenAccess);
    return res;
  };
  const checkOutStore = async (form) => {
    const res = await checkOutToken(form);
    if (res.payload.statusCode === 1) {
      user.value = res.payload;
      localStorage.setItem("token", res.payload.tokenAccess);
    }
  };

  const storeLogout = async () => {
    const res = await logoutService();
    token.value = null;
    localStorage.removeItem("token");
    return res;
  };

  const getToken = computed(() => token.value || localStorage.getItem("token"));

  return {
    user,
    token,
    storeLogin,
    storeLogout,
    checkOutStore,
    getToken,
  };
});
