import { defineStore } from "pinia";
import { ref } from "vue";
import userService from "@/services/userService";
export const staffStore = defineStore("staffStore", () => {
  const staffs = ref([]);
  const page = ref(null);
  const totalPages = ref(null);

  const getAllStaff = async (form) => {
    const res = await userService.fetchAllStaff(form);
    if (res.status === 200) {
      staffs.value = res.payload?.content;
      page.value = res.payload?.page;
      totalPages.value = res.payload?.total;
    }
    return res;
  };

  return {
    staffs,
    page,
    totalPages,
    getAllStaff,
  };
});
