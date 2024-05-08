import { defineStore } from "pinia";
import { ref } from "vue";
import discountsService from "@/services/discountsService";

export const discountStore = defineStore("discountStore", () => {
  const discounts = ref([]);
  const discountsByCustomer = ref([]);
  const page = ref(null);
  const totalPages = ref(null);

  const getAlldiscounts = async (form = { page: 0, pageSize: 5 }) => {
    const res = await discountsService.fetchAlldiscounts(form);
    page.value = res?.page;
    totalPages.value = res?.total;
    discounts.value = res?.content;
  };

  return {
    discountsByCustomer,
    discounts,
    page,
    totalPages,
    getAlldiscounts,
  };
});
