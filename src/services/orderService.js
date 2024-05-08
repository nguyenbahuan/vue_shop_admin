import instance from "./axiosConfig";

const orderService = {
  async fetchAllOrder(form = {}) {
    const res = await instance.post("admin/oders/get-all", form);
    return res.data?.payload;
  },
  async fetchAllOrderByCustomer(userId, form = {}) {
    const res = await instance.post(
      `admin/customers/detail/${userId}/oder`,
      form
    );
    return res.data?.payload;
  },
  async getOder(id) {
    const res = await instance.get("admin/oders/show/" + id);
    return res.data?.payload;
  },

  async getOderDetail(id) {
    const res = await instance.get("admin/oders/show/" + id + "/detail");
    return res.data?.payload;
  },

  async updateStatusOder(id, formUpdate) {
    try {
      const res = await instance.patch(
        "admin/oders/update-status/" + id,
        formUpdate
      );
      return res.data?.payload;
    } catch (error) {
      return error;
    }
  },
};
export default orderService;
