<script setup>
import { mdiMonitorCellphone, mdiTableBorder, mdiTableOff } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Tables" main>
      </SectionTitleLineWithButton>
      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar>

      <CardBox class="mb-6" has-table>
        <TableSampleClients checkable />
      </CardBox>

      <SectionTitleLineWithButton :icon="mdiTableOff" title="Empty variation" />

      <NotificationBar color="danger" :icon="mdiTableOff">
        <b>Empty table.</b> When there's nothing to show
      </NotificationBar>

      <CardBox>
        <CardBoxComponentEmpty />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
