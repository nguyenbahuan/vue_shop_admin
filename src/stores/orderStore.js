import { defineStore } from "pinia";
import { ref } from "vue";
import orderService from "@/services/orderService";
export const orderStore = defineStore("orderStore", () => {
  const orders = ref([]);
  const ordersByCustomer = ref([]);
  const page = ref(null);
  const totalPages = ref(null);

  const getAllOrders = async (form) => {
    const res = await orderService.fetchAllOrder(form);
    page.value = res?.page;
    totalPages.value = res?.total;
    orders.value = res?.content;
  };
  const getAllOrdersByCustomer = async (id, form) => {
    const res = await orderService.fetchAllOrderByCustomer(id, form);
    page.value = res?.page;
    totalPages.value = res?.total;
    ordersByCustomer.value = res?.content;
  };

  return {
    ordersByCustomer,
    orders,
    page,
    totalPages,
    getAllOrders,
    getAllOrdersByCustomer,
  };
});
