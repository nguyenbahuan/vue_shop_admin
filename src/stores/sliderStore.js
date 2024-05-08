import { defineStore } from "pinia";
import { ref } from "vue";
import sliderService from "@/services/sliderService";
export const sliderStore = defineStore("sliderStore", () => {
  const sliders = ref([]);
  const totalPages = ref(null);
  const page = ref(null);

  const getAllSlider = async (form) => {
    const res = await sliderService.fetchAllSlider(form);
    if (res.status === 200) {
      sliders.value = res.payload.content;
      totalPages.value = res.payload.total;
      page.value = res.page;
    }
    return res;
  };

  return {
    sliders,
    totalPages,
    page,
    getAllSlider,
  };
});
