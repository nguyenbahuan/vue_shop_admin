<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiCartArrowDown"
        title="Danh sách đơn hàng"
        main
      >
      </SectionTitleLineWithButton>

      <CardBox class="mb-6 shadow-2xl" has-table>
        <TableOders />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { mdiCartArrowDown } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import TableOders from "@/components/TableOders.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
</script>
