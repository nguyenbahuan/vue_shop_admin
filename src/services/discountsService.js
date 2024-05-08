import instance from "./axiosConfig";

const discountsService = {
  async fetchAlldiscounts(form = {}) {
    const res = await instance.post("/admin/discounts/get-all", form);
    return res.data?.payload;
  },
  async fetchAlldiscountProduct(form = {}) {
    const res = await instance.post("/admin/product-discount/get-all", form);
    return res.data?.payload;
  },
  async searchdiscounts(form = { page: 0, pageSize: 5 }) {
    const res = await instance.post("/admin/discounts/search", form);
    return res.data?.payload;
  },
  async getDiscounts(id) {
    const res = await instance.get("/admin/discounts/show/" + id);
    return res.data?.payload;
  },
  async createDiscounts(formCreate) {
    try {
      const res = await instance.post("/admin/discounts/create", formCreate);
      return res.data?.payload;
    } catch (error) {
      return error;
    }
  },
  async createProductDiscounts(formCreate) {
    try {
      const res = await instance.post(
        "/admin/product-discount/store",
        formCreate
      );
      return res.data?.payload;
    } catch (error) {
      return error;
    }
  },
  async updateDiscounts(id, formCreate) {
    try {
      const res = await instance.post(
        "/admin/discounts/update/" + id,
        formCreate
      );
      return res.data?.payload;
    } catch (error) {
      return error;
    }
  },
  async deleteDiscounts(id) {
    try {
      const res = await instance.post("/admin/discounts/delete/" + id);
      return res.data?.payload;
    } catch (error) {
      return error;
    }
  },
  async getDiscountsProduct(id) {
    try {
      const res = await instance.get("/admin/product-discount/show/" + id);
      return res.data?.payload;
    } catch (error) {
      return error;
    }
  },
  async updateDiscountsProduct(id, form) {
    try {
      const res = await instance.post(
        "/admin/product-discount/update/" + id,
        form
      );
      return res.data?.payload;
    } catch (error) {
      return error;
    }
  },
  async deleteDiscountsProduct(id) {
    try {
      const res = await instance.delete("/admin/product-discount/delete/" + id);
      return res.data?.payload;
    } catch (error) {
      return error;
    }
  },
};
export default discountsService;
