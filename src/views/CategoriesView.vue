<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiTableBorder"
        title="Danh mục sản phẩm"
        main
      >
      </SectionTitleLineWithButton>
      <BaseButton
        class="my-3"
        color="info"
        label="Thêm danh mục sản phẩm"
        to="/create-category"
        :icon="mdiPlus"
        small
        @click="isModalDangerActive = true"
      />
      <CardBox class="mb-6 shadow-2xl" has-table>
        <TableCategory />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { mdiTableBorder, mdiPlus } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import TableCategory from "@/components/TableCategory.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";

import { ref, onMounted } from "vue";

import { useRoute } from "vue-router";

const isModalDangerActive = ref(false);

const router = useRoute();

onMounted(() => {
  console.log(router);
});
</script>
