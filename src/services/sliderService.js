import instance from "./axiosConfig";

const sliderService = {
  async getSlider(id) {
    const res = await instance.get("/admin/slider/show/" + id);
    return res.data?.payload;
  },
  async fetchAllSlider(form) {
    const res = await instance.post("/admin/slider/get-all", form);
    return res.data;
  },
  async createSlider(formCreate) {
    const res = await instance.post("/admin/slider/create", formCreate, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data?.payload;
  },
  async updateSlider(id, formUpdate) {
    const res = await instance.put(`/admin/slider/update/${id}`, formUpdate, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data?.payload;
  },
  async deleteSlider(id) {
    const res = await instance.delete("/admin/slider/delete/" + id);
    return res.data?.payload;
  },
};
export default sliderService;
