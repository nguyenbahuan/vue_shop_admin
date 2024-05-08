import instance from "./axiosConfig";

const categoryService = {
  async fetchAllCategory() {
    const res = await instance.get("/admin/categories/get-all");
    return res.data?.payload;
  },
  async searchCategory(form = { page: 0, pageSize: 10 }) {
    const res = await instance.post("/admin/categories/search", form);
    return res.data?.payload;
  },
  async getCategory(id) {
    const res = await instance.get("/admin/categories/detail/" + id);
    return res.data?.payload;
  },
  async createCategory(formCreate) {
    try {
      const res = await instance.post("/admin/categories/create", formCreate);
      return res.data;
    } catch (error) {
      return error;
    }
  },
  async updateCategory(id, formCreate) {
    try {
      const res = await instance.put(
        "/admin/categories/update/" + id,
        formCreate
      );
      return res.data;
    } catch (error) {
      return error;
    }
  },
  async deleteCategory(id) {
    try {
      const res = await instance.delete("/admin/categories/delete/" + id);
      return res.data;
    } catch (error) {
      return error;
    }
  },
};
export default categoryService;
