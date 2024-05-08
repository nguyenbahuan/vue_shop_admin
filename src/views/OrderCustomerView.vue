<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiTableBorder"
        title="Danh sách đơn hàng"
        main
      >
      </SectionTitleLineWithButton>

      <CardBox class="mb-6 shadow-2xl" has-table>
        <TableOrderCustomer checkable />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { mdiTableBorder } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import TableOrderCustomer from "@/components/TableOrderCustomer.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
</script>
