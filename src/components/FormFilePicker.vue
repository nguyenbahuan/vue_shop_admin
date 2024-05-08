<script setup>
import { mdiUpload } from "@mdi/js";
import { computed, ref, watch } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  modelValue: {
    type: [Object, File, Array],
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: mdiUpload,
  },
  accept: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: "info",
  },
  isRoundIcon: Boolean,
  error: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const root = ref(null);

const file = ref(props.modelValue);

const showFilename = computed(() => !props.isRoundIcon && file.value);

const modelValueProp = computed(() => props.modelValue);

const inputElClass = computed(() => {
  const base = [
    "px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full",
    "dark:placeholder-gray-400",
    props.borderless ? "border-0" : "border",
    props.transparent ? "bg-transparent" : "bg-white dark:bg-slate-800",
    props.error ? "border-2 border-rose-600" : "",
  ];

  if (props.icon) {
    base.push("pl-10");
  }

  return base;
});

watch(modelValueProp, (value) => {
  file.value = value;

  if (!value) {
    root.value.input.value = null;
  }
});

const upload = (event) => {
  const value = event.target.files || event.dataTransfer.files;

  file.value = value;

  emit("update:modelValue", file.value);

  // Use this as an example for handling file uploads
  // let formData = new FormData()
  // formData.append('file', file.value)

  // const mediaStoreRoute = `/your-route/`

  // axios
  //   .post(mediaStoreRoute, formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     },
  //     onUploadProgress: progressEvent
  //   })
  //   .then(r => {
  //
  //   })
  //   .catch(err => {
  //
  //   })
};

// const uploadPercent = ref(0)
//
// const progressEvent = progressEvent => {
//   uploadPercent.value = Math.round(
//     (progressEvent.loaded * 100) / progressEvent.total
//   )
// }
</script>

<template>
  <div class="flex items-stretch justify-start relative">
    <label class="inline-flex">
      <BaseButton
        as="a"
        :class="{ 'w-12 h-12': isRoundIcon, 'rounded-r-none': showFilename }"
        :icon-size="isRoundIcon ? 24 : undefined"
        :label="isRoundIcon ? null : label"
        :icon="icon"
        :color="color"
        :rounded-full="isRoundIcon"
      />
      <input
        ref="root"
        type="file"
        multiple
        class="absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-1"
        :accept="accept"
        @input="upload"
        :class="inputElClass"
      />
    </label>
    <div
      v-if="showFilename"
      class="px-4 py-2 bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 border rounded-r"
    >
      <span class="text-ellipsis line-clamp-1">
        <template v-for="(f, index) in file">
          {{ f.name }}
          <!-- Hiển thị tên của mỗi tệp -->
          <span v-if="index !== file.length - 1" :key="index">; </span>
          <!-- Hiển thị dấu phẩy giữa các tên tệp, trừ tệp cuối cùng -->
        </template>
      </span>
    </div>
  </div>
</template>
