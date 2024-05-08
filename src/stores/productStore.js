import { defineStore } from "pinia";
import { ref } from "vue";
import produtcService from "@/services/productsService";
export const productStore = defineStore("productStore", () => {
  const products = ref([]);
  const page = ref(null);
  const totalPages = ref(null);

  const getAllProduct = async (form) => {
    const res = await produtcService.fetchAllProduct(form);
    products.value = res?.content;
    page.value = res?.page;
    totalPages.value = res?.total;
  };

  return {
    products,
    page,
    totalPages,
    getAllProduct,
  };
});
