<script setup>
// import { computed } from "vue";
// import { colorsBgLight, colorsOutline } from "@/colors.js";
import PillTag from "@/components/PillTag.vue";
import { defineProps } from "vue";
const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});

const componentStatus = () => {
  const status = props.status;
  switch (status) {
    case 0:
      return "Đang chờ duyệt";
    case 1:
      return "Đơn hàng đã duyệt";
    case 2:
      return "Từ chối";
    case 3:
      return "Đang giao";
    case 4:
      return "Hoàn thành";
    case 5:
      return "Hủy đơn";
    case 6:
      return "Hoàn đơn";
  }
};
const colorStatus = () => {
  const status = props.status;
  switch (status) {
    case 0:
      return "info";
    case 1:
      return "info";
    case 2:
      return "warning";
    case 3:
      return "success";
    case 4:
      return "success";
    case 5:
      return "danger";
    case 6:
      return "danger";
  }
};
componentStatus();
</script>

<template>
  <PillTag :color="colorStatus()" :label="componentStatus()" />
</template>
