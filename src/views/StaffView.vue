<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Nhân viên" main>
      </SectionTitleLineWithButton>
      <BaseButton
        v-if="isAdmin"
        class="my-3"
        color="info"
        label="Thêm nhân viên"
        to="/create-staffs"
        :icon="mdiPlus"
        small
        @click="isModalDangerActive = true"
      />
      <CardBox class="mb-6 shadow-2xl" has-table>
        <TableStaff />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { mdiTableBorder, mdiPlus } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import TableStaff from "@/components/TableStaff.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import { staffStore } from "@/stores/staffStore";
import { onBeforeMount, ref } from "vue";

const storeStaff = staffStore();
const isModalDangerActive = ref(false);
const isAdmin = ref(true);
onBeforeMount(async () => {
  const res = await storeStaff.getAllStaff();
  if (res.status === 403) {
    isAdmin.value = false;
  }
});
</script>
