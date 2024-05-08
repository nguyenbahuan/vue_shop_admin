import instance from "./axiosConfig";

const productService = {
  async fetchAllProduct(form) {
    const res = await instance.post("/admin/products/search", form);
    return res.data?.payload;
  },
  async createProduct(formCreate) {
    try {
      const res = await instance.post("/admin/products/create", formCreate, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  },
  async updateProduct(id, formUpdate) {
    try {
      const res = await instance.put(
        "/admin/products/update/" + id,
        formUpdate,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error) {
      return error;
    }
  },
  async deleteProduct(id) {
    try {
      const res = await instance.delete("/admin/products/delete/" + id);
      return res.data;
    } catch (error) {
      return error;
    }
  },
  async detailProduct(id) {
    try {
      const res = await instance.get(`/admin/products/detail/${id}`);
      return res.data;
    } catch (error) {
      return error;
    }
  },
};
export default productService;
