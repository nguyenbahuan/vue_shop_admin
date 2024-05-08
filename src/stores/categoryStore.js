import { defineStore } from "pinia";
import { ref } from "vue";
import categoryService from "@/services/categoryService";
export const categoryStore = defineStore("categoryStore", () => {
  const categories = ref([]);
  const page = ref(null);
  const totalPages = ref(null);

  const getAllCategory = async (form) => {
    const res = await categoryService.searchCategory(form);
    categories.value = res?.content;
    page.value = res?.page;
    totalPages.value = res?.total;
  };

  return {
    categories,
    page,
    totalPages,
    getAllCategory,
  };
});
