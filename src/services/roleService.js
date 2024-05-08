import instance from "./axiosConfig";

const rolesService = {
  async fetchAllRole() {
    const res = await instance.get("/admin/roles/get-all");
    return res.data?.payload;
  },
};
export default rolesService;
