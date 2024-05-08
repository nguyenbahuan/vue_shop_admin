import instance from "./axiosConfig";

const userService = {
  async countCustomer() {
    const res = await instance.get("/admin/customers/get-quantity");
    return res.data?.payload;
  },
  async fetchAllCustomer(form = {}) {
    const res = await instance.post("/admin/customers/get-all", form);
    return res.data?.payload;
  },
  async searchCustomer(form = {}) {
    const res = await instance.post("/admin/customers/search", form);
    return res.data?.payload;
  },
  async getCustomer(id) {
    const res = await instance.get("/admin/customers/detail/" + id);
    return res.data?.payload;
  },
  async deleteCustomer(id) {
    try {
      const res = await instance.delete("/admin/customers/delete/" + id);
      return res.data;
    } catch (error) {
      return error;
    }
  },
  async updateProfile(form) {
    try {
      const res = await instance.put("/admin/profile/update", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data?.payload;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },
  async changePass(form) {
    try {
      const res = await instance.post("/admin/profile/change-password", form);
      return res.data?.payload;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },
  // staff
  async createStaff(form) {
    try {
      const res = await instance.post("/admin/staffs/create", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  },
  async updateStaff(id, form) {
    try {
      const res = await instance.post(`/admin/staffs/show/${id}/update`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  },
  async fetchAllStaff(form = {}) {
    const res = await instance.post("/admin/staffs/get-all", form);
    return res.data;
  },
  async searchStaff(form = {}) {
    const res = await instance.post("/admin/staffs/search", form);
    return res.data?.payload;
  },
  async getStaff(id) {
    const res = await instance.get("/admin/staffs/show/" + id);
    return res.data?.payload;
  },
  async deleteStaff(id) {
    try {
      const res = await instance.post("/admin/staffs/delete/" + id);
      return res.data;
    } catch (error) {
      return error;
    }
  },
};
export default userService;
