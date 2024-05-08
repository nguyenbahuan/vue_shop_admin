<template>
  <div>
    <table class="mt-4 w-full text-gray-500 sm:mt-6">
      <caption class="sr-only">
        Sản phẩm
      </caption>
      <thead class="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
        <tr>
          <th scope="col" class="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
            Sản phẩm
          </th>
          <th
            scope="col"
            class="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
          >
            Giá
          </th>
          <th scope="col" class="hidden py-3 pr-8 font-normal sm:table-cell">
            Số lượng
          </th>
          <th scope="col" class="w-0 py-3 text-right font-normal">
            Thành Tiền
          </th>
        </tr>
      </thead>
      <tbody
        class="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t"
      >
        <tr v-for="(detai, index) in detailOder" :key="index">
          <td class="py-6 pr-8">
            <div class="flex items-center">
              <img
                v-if="detai.products.images[0]"
                :src="HOST_IMG + '/' + detai.products.images[0].imageName"
                alt="Black tee with intersecting red, white, and green curved lines on front."
                class="mr-6 h-16 w-16 rounded object-cover object-center"
              />
              <img
                v-else
                src="https://flowbite.com/docs/images/products/apple-watch.png"
                alt="Black tee with intersecting red, white, and green curved lines on front."
                class="mr-6 h-16 w-16 rounded object-cover object-center"
              />
              <div>
                <div class="font-medium text-gray-900">
                  {{ detai.products.name }}
                </div>
              </div>
            </div>
          </td>
          <td class="hidden py-6 pr-8 sm:table-cell">
            {{ FormatPrice(detai.subPrice) }}
          </td>
          <td class="hidden py-6 pr-8 sm:table-cell">
            {{ detai.quantity }}
          </td>
          <td class="whitespace-nowrap py-6 text-right font-medium">
            {{ FormatPrice(totalSubPrice(detai)) }}
          </td>
        </tr>

        <!-- More products... -->
      </tbody>
    </table>
    <div
      class="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8"
    >
      <dl
        class="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8"
      >
        <div
          class="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0"
        >
          <dt>Tổng tiền</dt>
          <dd class="sm:mt-1">{{ FormatPrice(totalPrice()) }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { HOST_IMG } from "@/services/constant";
import FormatPrice from "@/utils/formatPrice";
const props = defineProps({
  detailOder: {
    typeof: Object,
    require: true,
  },
});
const totalSubPrice = (detai) => {
  return detai.subPrice * detai.quantity;
};
const totalPrice = () => {
  return props.detailOder.reduce(
    (curent, next) => curent + next.subPrice * next.quantity,
    0
  );
};
</script>
