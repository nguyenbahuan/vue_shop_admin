import { toast } from "vue3-toastify";

const toastConfig = {
  toastSuccses(mes) {
    toast(mes, {
      type: "success",
      position: "top-right",
      autoClose: 3000,
    });
  },
  toastError(mes) {
    toast(mes, {
      type: "error",
      position: "top-right",
      autoClose: 3000,
    });
  },
};

export default toastConfig;
