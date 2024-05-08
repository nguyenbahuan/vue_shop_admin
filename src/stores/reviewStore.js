import { defineStore } from "pinia";
import { ref } from "vue";
import reviewService from "@/services/reviewService";
export const reviewStore = defineStore("reviewStore", () => {
  const reviews = ref([]);
  const page = ref(null);
  const totalPages = ref(null);

  const getAllReview = async (form) => {
    const res = await reviewService.fetchAllReview(form);
    page.value = res?.page;
    totalPages.value = res?.total;
    reviews.value = res?.content;
  };
  // const getAllOrdersByCustomer = async (id, form) => {
  //   const res = await reviewService.fetchAllOrderByCustomer(id, form);
  //   page.value = res?.page;
  //   totalPages.value = res?.total;
  //   reviewsByCustomer.value = res?.content;
  // };

  return {
    reviews,
    page,
    totalPages,
    getAllReview,
  };
});
