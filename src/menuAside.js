import {
  mdiAccountCircle,
  mdiMonitor,
  mdiShoppingOutline,
  mdiInvoiceListOutline,
  mdiCartVariant,
  mdiTableAccount,
  mdiAccountGroup,
  mdiSale,
  mdiStarCheck,
  mdiImageArea,
  mdiInvoiceTextEditOutline,
} from "@mdi/js";

export default [
  {
    to: "/dashboard",
    icon: mdiMonitor,
    label: "Bảng điều khiển",
  },
  {
    to: "/products",
    label: "Sản phẩm",
    icon: mdiShoppingOutline,
  },
  {
    to: "/categories",
    label: "Danh mục",
    icon: mdiInvoiceListOutline,
  },
  {
    to: "/orders",
    label: "Đơn hàng",
    icon: mdiCartVariant,
  },
  {
    to: "/customers",
    label: "Khách hàng",
    icon: mdiTableAccount,
  },
  {
    to: "/reviews",
    label: "Đánh giá",
    icon: mdiStarCheck,
  },
  {
    to: "/staffs",
    label: "Nhân viên",
    icon: mdiAccountGroup,
  },
  {
    to: "/discounts",
    label: "Giảm giá",
    icon: mdiSale,
  },
  {
    to: "/slider",
    label: "Slider",
    icon: mdiImageArea,
  },
  {
    to: "/statistical",
    label: "Thống kê",
    icon: mdiInvoiceTextEditOutline,
  },
  {
    to: "/profile",
    label: "Thông tin",
    icon: mdiAccountCircle,
  },
];
