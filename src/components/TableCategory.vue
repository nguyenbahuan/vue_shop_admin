<script setup>
import { computed, onBeforeMount, reactive, ref } from "vue";
// import { useMainStore } from "@/stores/main";
import { categoryStore } from "@/stores/categoryStore";
import { mdiEye, mdiTrashCan, mdiUpdate } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import { defineProps } from "vue";
import categoryService from "@/services/categoryService";
import { VueAwesomePaginate } from "vue-awesome-paginate";
defineProps({
  checkable: Boolean,
});

// const mainStore = useMainStore();

const storeCategory = categoryStore();

const items = computed(() => storeCategory.categories);

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const categoryDetail = ref(null);

const getCategory = async (id) => {
  isModalActive.value = true;
  categoryDetail.value = null;
  const res = await categoryService.getCategory(id);
  categoryDetail.value = res;
  return res?.payload;
};
const handleDeleteProduct = async (id) => {
  isModalDangerActive.value = true;
  categoryDetail.value = null;
  const res = await categoryService.getCategory(id);
  categoryDetail.value = res;
};
const deleteProduct = async (id) => {
  const res = await categoryService.deleteCategory(id);
  console.log(res);
};
const currentPage = ref(1);
const formSearch = reactive({
  page: 0,
  pageSize: 5,
});

const checkedRows = ref([]);

const itemsPaginated = computed(() => items.value);
const numPages = computed(() => storeCategory.totalPages);

const currentPageHuman = computed(() => formSearch.page + 1);

const onClickHandler = async (value) => {
  formSearch.page = value - 1;
  await storeCategory.getAllCategory(formSearch);
};
// const pagesList = computed(() => {
//   const pagesList = [];

//   for (let i = 0; i < numPages.value; i++) {
//     pagesList.push(i);
//   }

//   return pagesList;
// });

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

onBeforeMount(async () => {
  await storeCategory.getAllCategory(formSearch);
});
</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Thông tin sản phẩm">
    <div v-if="categoryDetail">
      <div class="mt-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Tên danh mục
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ categoryDetail.name }}
            </dd>
          </div>

          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Ngày tạo
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ categoryDetail.createdDate }}
            </dd>
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Ngày cập nhật
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ categoryDetail.updatedDate }}
            </dd>
          </div>

          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Hoạt động
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ categoryDetail.active ? "Đang hoạt động" : "Dừng hoạt động" }}
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
    @confirm="deleteProduct(categoryDetail.id)"
  >
    <p v-if="categoryDetail">
      Bạn có muốn xóa danh mục <b>{{ categoryDetail.name }}</b> ???
    </p>
    <p v-else>loading...</p>
  </CardBoxModal>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>#</th>
        <th>Tên danh mục</th>
        <th />
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id">
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />

        <td data-label="Name">
          {{ client.id }}
        </td>

        <td data-label="City">
          {{ client.name }}
        </td>

        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              @click="getCategory(client.id)"
            />
            <BaseButton
              color="info"
              :icon="mdiUpdate"
              small
              :to="'/update-category/' + client.id"
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
