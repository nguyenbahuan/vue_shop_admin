import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "@/services/authService";
import { authStore } from "@/stores/authStore";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    meta: {
      title: "/",
      requiresAuth: true,
    },
    path: "/",
    name: "home",
    component: HomeView,
    redirect: "/dashboard",
  },
  {
    meta: {
      title: "Dashboard",
      requiresAuth: true,
    },
    path: "/dashboard",
    name: "dashboard",
    component: HomeView,
  },
  {
    meta: {
      title: "Products",
      requiresAuth: true,
    },
    path: "/products",
    name: "products",
    component: () => import("@/views/ProductsView.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import("@/views/CategoriesView.vue"),
    meta: {
      title: "Danh mục sản phẩm",
      requiresAuth: true,
    },
  },
  {
    path: "/create-category",
    name: "create categories",
    component: () => import("@/views/CreateCategory.vue"),
    meta: {
      title: "Thêm danh mục sản phẩm",
      requiresAuth: true,
    },
  },
  {
    path: "/update-category/:id",
    name: "updateproducts",
    component: () => import("@/views/UpdateCategory.vue"),
    meta: {
      title: "Update Category",
      requiresAuth: true,
    },
  },
  {
    path: "/create-product",
    name: "createproducts",
    component: () => import("@/views/CreateProductView.vue"),
    meta: {
      title: "Create",
      requiresAuth: true,
    },
  },
  {
    path: "/detail-product/:id",
    name: "detailproducts",
    component: () => import("@/views/ProductDetail.vue"),
    meta: {
      title: "Update",
      requiresAuth: true,
    },
  },
  {
    path: "/customers",
    name: "customers",
    component: () => import("@/views/CustomerView.vue"),
    meta: {
      title: "Khách hàng",
      requiresAuth: true,
    },
  },
  {
    path: "/customer-orders/:id",
    name: "customers oders",
    component: () => import("@/views/OrderCustomerView.vue"),
    meta: {
      title: "Khách hàng",
      requiresAuth: true,
    },
  },
  {
    path: "/staffs",
    name: "staff",
    component: () => import("@/views/StaffView.vue"),
    meta: {
      title: "Staff",
      requiresAuth: true,
    },
  },
  {
    path: "/create-staffs",
    name: "create staff",
    component: () => import("@/views/CreateStaffView.vue"),
    meta: {
      title: "Staff",
      requiresAuth: true,
    },
  },
  {
    path: "/update-staffs/:id",
    name: "update staff",
    component: () => import("@/views/UpdateStaffView.vue"),
    meta: {
      title: "Staff Update",
      requiresAuth: true,
    },
  },
  {
    path: "/discounts",
    name: "discounts",
    component: () => import("@/views/DiscountView.vue"),
    meta: {
      title: "Discounts",
      requiresAuth: true,
    },
  },
  {
    path: "/create-discounts",
    name: "create discounts",
    component: () => import("@/views/CreateDiscount.vue"),
    meta: {
      title: "Create Discounts",
      requiresAuth: true,
    },
  },
  {
    path: "/reviews",
    name: "reviews",
    component: () => import("@/views/ReviewProduct.vue"),
    meta: {
      title: "Create Discounts",
      requiresAuth: true,
    },
  },
  {
    meta: {
      title: "Tables",
      requiresAuth: true,
    },
    path: "/tables",
    name: "tables",
    component: () => import("@/views/TablesView.vue"),
  },
  {
    meta: {
      title: "Forms",
      requiresAuth: true,
    },
    path: "/forms",
    name: "forms",
    component: () => import("@/views/FormsView.vue"),
  },
  {
    meta: {
      title: "Profile",
      requiresAuth: true,
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
  },
  {
    path: "/statistical",
    component: () => import("@/views/StatisticalView.vue"),
    meta: {
      title: "Thống kê",
      requiresAuth: true,
    },
  },
  {
    path: "/slider",
    name: "slider",
    component: () => import("@/views/SliderView.vue"),
    meta: {
      title: "Slider",
      requiresAuth: true,
    },
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("@/views/OrdersView.vue"),
    meta: {
      title: "Orders",
      requiresAuth: true,
    },
  },
  {
    path: "/orders-detail/:id",
    name: "orders detail",
    component: () => import("@/views/OderDetail.vue"),
    meta: {
      title: "Orders Detail",
      requiresAuth: true,
    },
  },
  {
    meta: {
      title: "Ui",
      requiresAuth: true,
    },
    path: "/ui",
    name: "ui",
    component: () => import("@/views/UiView.vue"),
  },
  {
    meta: {
      title: "Login",
    },
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    meta: {
      title: "Responsive layout",
      requiresAuth: true,
    },
    path: "/responsive",
    name: "responsive",
    component: () => import("@/views/ResponsiveView.vue"),
  },
  {
    meta: {
      title: "Error",
      requiresAuth: true,
    },
    path: "/error",
    name: "error",
    component: () => import("@/views/ErrorView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(async (to, from, next) => {
  const storeAuth = authStore();
  // Kiểm tra nếu trang yêu cầu đăng nhập và người dùng chưa đăng nhập

  if (to.meta.requiresAuth) {
    const res = await isAuthenticated();
    if (!res) {
      // Chuyển hướng đến trang đăng nhập
      next({ name: "login" });
    } else {
      if (storeAuth.getToken) {
        await storeAuth.checkOutStore({ token: storeAuth.getToken });
      }
      next();
    }
  } else {
    // Cho phép truy cập
    next();
    // await storeAuth.checkOutStore({ token: storeAuth.getToken });
  }
});

export default router;
