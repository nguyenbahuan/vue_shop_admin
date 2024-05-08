<script setup>
import { computed, onBeforeMount, reactive, ref } from "vue";
// import { useMainStore } from "@/stores/main";
import { productStore } from "@/stores/productStore";
import { mdiEye, mdiTrashCan, mdiUpdate } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import FormatPrice from "@/utils/formatPrice";
import { defineProps } from "vue";
import productService from "@/services/productsService";
import { VueAwesomePaginate } from "vue-awesome-paginate";
import toastConfig from "@/utils/toastConfig";

defineProps({
  checkable: Boolean,
});

// const mainStore = useMainStore();

const storeProduct = productStore();

const items = computed(() => storeProduct.products);

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const productDetail = ref(null);

const getProduct = async (id) => {
  isModalActive.value = true;
  productDetail.value = null;
  const res = await productService.detailProduct(id);
  console.log(res?.payload);
  productDetail.value = res?.payload;
  return res?.payload;
};
const handleDeleteProduct = async (id) => {
  isModalDangerActive.value = true;
  productDetail.value = null;
  const res = await productService.detailProduct(id);
  productDetail.value = res?.payload;
};
const deleteProduct = async (id) => {
  const res = await productService.deleteProduct(id);
  if (res.statusCode === 1) {
    toastConfig.toastSuccses(res.message);
  } else toastConfig.toastError(res.message);
};
const currentPage = ref(1);
const formSearch = reactive({
  page: 0,
  pageSize: 5,
});

const checkedRows = ref([]);

const itemsPaginated = computed(() => items.value);

const numPages = computed(() => storeProduct.totalPages);

const currentPageHuman = computed(() => formSearch.page + 1);

const onClickHandler = async (value) => {
  formSearch.page = value - 1;
  await storeProduct.getAllProduct(formSearch);
};

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === client.id
    );
  }
};
const load = ref(true);
onBeforeMount(async () => {
  await storeProduct.getAllProduct(formSearch);
  load.value = false;
});
</script>

<template>
  <div
    v-if="load"
    class="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50"
  >
    <div class="flex justify-center items-center mt-[50vh]">
      <font-awesome-icon
        :icon="['fas', 'spinner']"
        class="animate-spin text-lg"
      />
    </div>
  </div>
  <CardBoxModal v-model="isModalActive" title="Thông tin sản phẩm">
    <div v-if="productDetail">
      <div class="mt-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Tên sản phẩm
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ productDetail.name }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Số lượng
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ productDetail.totalQuantity }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Ngày tạo
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ productDetail.createdDate }}
            </dd>
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Ngày cập nhật
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ productDetail.updatedDate }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Giá</dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ productDetail.price }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Mô tả</dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ productDetail.description }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Hoạt động
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ productDetail.active ? "Đang hoạt động" : "Dừng hoạt động" }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <div
      v-else
      class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto"
    >
      <div class="animate-pulse flex space-x-4">
        <div class="rounded-full bg-slate-200 h-10 w-10"></div>
        <div class="flex-1 space-y-6 py-1">
          <div class="h-2 bg-slate-200 rounded"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 bg-slate-200 rounded col-span-2"></div>
              <div class="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div class="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Xóa sản phẩm"
    button="danger"
    has-cancel
    @confirm="deleteProduct(productDetail.id)"
  >
    <p v-if="productDetail">
      Bạn có muốn xóa sản phẩm <b>{{ productDetail.name }}</b> ???
    </p>
    <p v-else>loading...</p>
  </CardBoxModal>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th />
        <th>Tên sản phẩm</th>
        <th>Giá</th>
        <th>Mô tả</th>
        <th>Số lượng</th>
        <th>Danh mục</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id">
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />
        <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar
            :username="client.name"
            :avatar="client?.images[0]?.imageName"
            class="w-24 mx-auto lg:h-6 rounded-none"
          />
        </td>
        <td data-label="Name">
          {{ client.name }}
        </td>
        <td data-label="Company">
          {{ FormatPrice(client.price) }}
        </td>
        <td data-label="City">
          {{ client.description }}
        </td>
        <td data-label="Progress" class="lg:w-32">
          {{ client.totalQuantity }}
        </td>
        <td data-label="Created" class="lg:w-32 text-wrap">
          {{ client.category?.name }}
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              @click="getProduct(client.id)"
            />
            <BaseButton
              color="info"
              :icon="mdiUpdate"
              small
              :to="'/detail-product/' + client.id"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="handleDeleteProduct(client.id)"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <!-- <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === formSearch.page"
          :label="page + 1"
          :color="page === formSearch.page ? 'lightDark' : 'whiteDark'"
          small
          @click="formSearch.page = page"
        />
      </BaseButtons> -->
      <div v-if="items.length > 0">
        <vue-awesome-paginate
          class="mb-10 mt-4"
          :total-items="numPages * 10"
          v-model="currentPage"
          :on-click="onClickHandler"
        />
      </div>
      <small>Trang {{ currentPageHuman }} / {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
<style>
.pagination-container {
  column-gap: 5px;
}
.paginate-buttons {
  width: 50px;
  height: 40px;
  cursor: pointer;
  background-color: #f39c12;
  border: none;
  color: white;
  border-radius: 2px;
}
.back-button,
.next-button {
  width: 60px;
  height: 40px;
}
.paginate-buttons:hover,
.active-page:hover {
  background-color: #ffb33a;
}
.active-page {
  background-color: #d35400;
}
.back-button:active,
.next-button:active {
  background-color: #dd9e39;
}
</style>
