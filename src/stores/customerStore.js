import { defineStore } from "pinia";
import { ref } from "vue";
import userService from "@/services/userService";
export const customerStore = defineStore("customerStore", () => {
  const customers = ref([]);
  const page = ref(null);
  const totalPages = ref(null);

  const getAllCustomer = async (form) => {
    const res = await userService.fetchAllCustomer(form);
    customers.value = res?.content;
    page.value = res?.page;
    totalPages.value = res?.total;
  };

  return {
    customers,
    page,
    totalPages,
    getAllCustomer,
  };
});
