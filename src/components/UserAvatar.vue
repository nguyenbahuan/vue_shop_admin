<script setup>
import { computed, watch } from "vue";
import { defineProps } from "vue";
import { HOST_IMG } from "@/services/constant";
const props = defineProps({
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  api: {
    type: String,
    default: "avataaars",
  },
});

const avatar = computed(
  () =>
    HOST_IMG + "/" + props.avatar ??
    `https://flowbite.com/docs/images/products/apple-watch.png`
);
watch(props.avatar, () => {
  console.log(props.avatar);
  HOST_IMG + "/" + props.avatar;
});
</script>

<template>
  <div>
    <img
      :src="avatar"
      class="rounded-full block h-auto w-[150px] max-w-full bg-gray-100 dark:bg-slate-800"
    />
    <slot />
  </div>
</template>
