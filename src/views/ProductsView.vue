<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Sản phẩm" main>
      </SectionTitleLineWithButton>
      <BaseButton
        class="my-3"
        color="info"
        label="Thêm sản phẩm"
        to="/create-product"
        :icon="mdiPlus"
        small
        @click="isModalDangerActive = true"
      />
      <CardBox class="mb-6 shadow-2xl" has-table>
        <TableProducts />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { mdiTableBorder, mdiPlus } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import TableProducts from "@/components/TableProducts.vue";
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
