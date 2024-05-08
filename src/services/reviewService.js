import instance from "./axiosConfig";

const reviewService = {
  async fetchAllReview(form = {}) {
    const res = await instance.post("/admin/reviews/get-all", form);
    return res.data?.payload;
  },
  async searchReview(form = { page: 0, pageSize: 10 }) {
    const res = await instance.post("/admin/reviews/search", form);
    return res.data?.payload;
  },
  async getReview(id) {
    const res = await instance.get("/admin/reviews/detail/" + id);
    return res.data?.payload;
  },
  async getReviewInfo() {
    const res = await instance.get("/admin/reviews/reviews-info");
    return res.data?.payload;
  },
  async createReview(formCreate) {
    try {
      const res = await instance.post("/admin/reviews/create", formCreate);
      return res.data;
    } catch (error) {
      return error;
    }
  },
  async updateReview(id, formCreate) {
    try {
      const res = await instance.put("/admin/reviews/update/" + id, formCreate);
      return res.data;
    } catch (error) {
      return error;
    }
  },
  async deleteReview(id) {
    try {
      const res = await instance.delete("/admin/reviews/delete/" + id);
      return res.data;
    } catch (error) {
      return error;
    }
  },
};
export default reviewService;
