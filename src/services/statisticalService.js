import instance from "./axiosConfig";

const satisticalService = {
  async getToltalSales() {
    const res = await instance.get("/admin/statistical/get-total");
    return res.data?.payload;
  },
  async getStatisticalByYear(year) {
    const res = await instance.get(`/admin/statistical/by-year/${year}`);
    return res.data?.payload;
  },
  async getStatisticalByThisMonth() {
    const res = await instance.get(`/admin/statistical/by-this-month`);
    return res.data?.payload;
  },
  async getStatisticalTotalOrder() {
    const res = await instance.get(`/admin/statistical/get-total-order`);
    return res.data?.payload;
  },
  async getStatisticalMonthOrder() {
    const res = await instance.get(`/admin/statistical/get-month-order`);
    return res.data?.payload;
  },
  async getStatisticalByCategory() {
    const res = await instance.get(`/admin/statistical/by-categories`);
    return res.data?.payload;
  },
};
export default satisticalService;
