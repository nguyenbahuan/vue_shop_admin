import axios from "axios";
import { HOST_SEVER } from "./constant";
const instance = axios.create({
  baseURL: HOST_SEVER, // Địa chỉ URL của API
  timeout: 3000, // Thời gian timeout mặc định cho các yêu cầu (milliseconds)
});

// Thêm một interceptor cho mỗi yêu cầu trước khi nó được gửi đi
instance.interceptors.request.use(
  (config) => {
    // Thêm các header vào config của yêu cầu
    const contentType = config.headers["Content-Type"];
    config.headers["Authorization"] = "Bearer " + localStorage.getItem("token"); // Ví dụ: Thêm token vào header Authorization
    if (!contentType) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    // Xử lý lỗi nếu cần thiết
    return Promise.reject(error);
  }
);

export default instance;
