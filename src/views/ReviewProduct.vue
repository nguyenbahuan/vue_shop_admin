<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiStarCheck" title="Đánh giá" main>
      </SectionTitleLineWithButton>

      <CardBox v-if="infoReview" class="mb-6 shadow-2xl">
        <div>
          <h3>{{ infoReview.rating }} <BaseIcon :path="mdiStar" /></h3>
          <h2>
            Tổng số <b>{{ infoReview.totalReview }}</b> đánh giá
          </h2>
          <p>Tất cả các đánh giá là từ khách hàng chính hãng</p>
        </div>
      </CardBox>
      <CardBox class="mb-6 shadow-2xl" has-table>
        <TableRviews />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { mdiStarCheck } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import TableRviews from "@/components/TableRviews.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
// import CardBoxWidget from "@/components/CardBoxWidget.vue";
import reviewService from "@/services/reviewService";
import { onBeforeMount, ref } from "vue";
import { mdiStar } from "@mdi/js";
import BaseIcon from "@/components/BaseIcon.vue";
const infoReview = ref(null);
onBeforeMount(async () => {
  const res = await reviewService.getReviewInfo();
  infoReview.value = res;
});
</script>
