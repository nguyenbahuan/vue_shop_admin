<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>
<style>
.pagination-container {
  column-gap: 5px;
}
.paginate-buttons {
  width: 50px;
  height: 40px;
  cursor: pointer;
  background-color: #f39c12;
  border: none;
  color: white;
  border-radius: 2px;
}
.back-button,
.next-button {
  width: 60px;
  height: 40px;
}
.paginate-buttons:hover,
.active-page:hover {
  background-color: #ffb33a;
}
.active-page {
  background-color: #d35400;
}
.back-button:active,
.next-button:active {
  background-color: #dd9e39;
}
</style>
