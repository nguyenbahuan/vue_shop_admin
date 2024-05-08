<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiTableBorder"
        title="Khách hàng"
        main
      >
      </SectionTitleLineWithButton>

      <CardBox class="mb-6 shadow-2xl" has-table>
        <TableCustomer />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { mdiTableBorder } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import TableCustomer from "@/components/TableCustomer.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
</script>
