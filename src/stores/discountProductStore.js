import { defineStore } from "pinia";
import { ref } from "vue";
import discountsService from "@/services/discountsService";

export const discountProductStore = defineStore("discountProductStore", () => {
  const discountProduct = ref([]);
  const page = ref(null);
  const totalPages = ref(null);

  const getAlldiscountProduct = async (form = { page: 0, pageSize: 5 }) => {
    const res = await discountsService.fetchAlldiscountProduct(form);
    page.value = res?.page;
    totalPages.value = res?.total;
    discountProduct.value = res?.content;
  };

  return {
    discountProduct,
    page,
    totalPages,
    getAlldiscountProduct,
  };
});
