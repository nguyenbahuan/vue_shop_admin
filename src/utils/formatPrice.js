export default function FormatPrice(price) {
  if (price)
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
}
