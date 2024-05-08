<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton main title="Chiết Đơn Hàng">
      </SectionTitleLineWithButton>
      <div v-if="isLoader">
        <div class="px-4 sm:px-0">
          <h3 class="text-base font-semibold leading-7 text-gray-900">
            Thông tin đơn hàng
          </h3>
        </div>
        <div class="mt-6 border-t border-gray-100">
          <dl class="divide-y divide-gray-100">
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Người nhận
              </dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                {{ order.username }}
              </dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Số điện thoại
              </dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                {{ order.phoneNumber }}
              </dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Phương thức thanh toán
              </dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                {{ order.payMethod }}
              </dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Địa chỉ
              </dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                {{ order.address }}
              </dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Ngày đặt
              </dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                {{ order.createdDate }}
              </dd>
            </div>
          </dl>
          <TableOrderDetail :detailOder="orderDetail"></TableOrderDetail>
        </div>
      </div>
      <div
        v-else
        class="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50"
      >
        <div class="flex justify-center items-center mt-[50vh]">
          <font-awesome-icon
            :icon="['fas', 'spinner']"
            class="animate-spin text-lg"
          />
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { computed, onBeforeMount, ref } from "vue";
import TableOrderDetail from "@/components/TableOrderDetail.vue";
import { useRoute } from "vue-router";
import orderService from "@/services/orderService";

const orderDetail = ref(null);
const order = ref(null);
const load = ref(true);
const route = useRoute();
const isLoader = computed(
  () => order.value !== null && orderDetail.value !== null
);
onBeforeMount(async () => {
  console.log(route.path);
  const resOrderDetail = await orderService.getOderDetail(route.params.id);
  const resOrder = await orderService.getOder(route.params.id);
  orderDetail.value = resOrderDetail;
  order.value = resOrder;
  load.value = false;
});
</script>

<style scoped></style>
