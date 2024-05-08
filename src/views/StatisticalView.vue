<script setup>
import { computed, onBeforeMount, ref } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiReload,
  mdiChartPie,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
import CardBoxClient from "@/components/CardBoxClient.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import userService from "@/services/userService";
import statisticalService from "@/services/statisticalService";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const year = new Date().getFullYear();
const month = new Date().getMonth();
const percentSales = ref(null);
const data = ref(Array.from({ length: 12 }, () => 0));

const doughnutRef = ref();

const options = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: `Thống kê năm ${year}`,
    },
  },
});

const testData = computed(() => ({
  labels: Array.from({ length: 12 }, (_, i) => {
    return "Tháng " + (i + 1);
  }),
  datasets: [
    {
      label: "Tháng",
      data: data.value,
      backgroundColor: generateRandomColorsArray(12),
    },
  ],
}));

const quantityCustomer = ref(null);
const totalSales = ref(null);
const totalOrder = ref(null);
const monthOrder = ref(null);
const mainStore = useMainStore();

const clientBarItems = computed(() => mainStore.clients.slice(0, 4));

const transactionBarItems = computed(() => mainStore.history);

onBeforeMount(async () => {
  const res = await userService.countCustomer();
  const resTotal = await statisticalService.getStatisticalByThisMonth();
  const resTotalOder = await statisticalService.getStatisticalTotalOrder();
  const resByYear = await statisticalService.getStatisticalByYear(year);
  quantityCustomer.value = res;
  totalSales.value = resTotal;
  totalOrder.value = resTotalOder;
  monthOrder.value = await statisticalService.getStatisticalMonthOrder();
  data.value = resByYear.map((item) => item.total);
  percentSales.value = (
    ((data.value[month] - data.value[month - 1]) / data.value[month - 1]) *
    100
  ).toFixed(1);
});

function generateRandomColor() {
  // Tạo một số ngẫu nhiên từ 0 đến 255 cho mỗi thành phần RGB
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Kết hợp các thành phần RGB để tạo mã màu HEX
  const color = `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  return color;
}

function generateRandomColorsArray(length) {
  const colors = [];
  // Tạo một mảng màu ngẫu nhiên với độ dài được chỉ định
  for (let i = 0; i < length; i++) {
    colors.push(generateRandomColor());
  }
  return colors;
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Tổng Quan"
        main
      >
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="quantityCustomer"
          label="Khách hàng"
        />
        <CardBoxWidget
          :trend="percentSales + ' %'"
          :trend-type="data[month] < data[month - 1] ? 'down' : 'up'"
          color="text-blue-500"
          :icon="mdiCartOutline"
          :number="totalSales"
          suffix="đ"
          label="Doanh số tháng này"
        />
        <CardBoxWidget
          trend-type="up"
          color="text-red-500"
          :icon="mdiChartTimelineVariant"
          :number="monthOrder"
          label="Đơn hàng tháng này"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between">
          <CardBoxTransaction
            v-for="(transaction, index) in transactionBarItems"
            :key="index"
            :amount="transaction.amount"
            :date="transaction.date"
            :business="transaction.business"
            :type="transaction.type"
            :name="transaction.name"
            :account="transaction.account"
          />
        </div>
        <div class="flex flex-col justify-between">
          <CardBoxClient
            v-for="client in clientBarItems"
            :key="client.id"
            :name="client.name"
            :login="client.login"
            :date="client.created"
            :progress="client.progress"
          />
        </div>
      </div>

      <SectionTitleLineWithButton :icon="mdiChartPie" title="Doanh số">
        <BaseButton :icon="mdiReload" color="whiteDark" />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6">
        <BarChart
          ref="doughnutRef"
          :chart-data="testData"
          :options="options"
        ></BarChart>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
