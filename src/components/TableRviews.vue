<script setup>
import { computed, onBeforeMount, reactive, ref, watch } from "vue";
// import { useMainStore } from "@/stores/main";
import { reviewStore } from "@/stores/reviewStore";
// import { mdiEye, mdiTrashCan, mdiUpdate } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
// import BaseButtons from "@/components/BaseButtons.vue";
// import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import StarRating from "vue-star-rating";
import { defineProps } from "vue";
import userService from "@/services/userService";
import { VueAwesomePaginate } from "vue-awesome-paginate";

defineProps({
  checkable: Boolean,
});

// const mainStore = useMainStore();

const storeReview = reviewStore();

const items = computed(() => storeReview.reviews);

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const customerDetail = ref(null);

// const getCustomer = async (id) => {
//   isModalActive.value = true;
//   customerDetail.value = null;
//   const res = await userService.getCustomer(id);
//   console.log(res);
//   customerDetail.value = res;
//   return res;
// };
// const handleDeleteCustomer = async (id) => {
//   isModalDangerActive.value = true;
//   customerDetail.value = null;
//   const res = await userService.getCustomer(id);
//   customerDetail.value = res;
//   console.log(customerDetail);
// };
const deleteCustomer = async (id) => {
  const res = await userService.deleteCustomer(id);
  console.log(res);
};
const currentPage = ref(1);
const formSearch = reactive({
  page: 0,
  pageSize: 10,
});

const checkedRows = ref([]);

const itemsPaginated = computed(() => items.value);
watch(
  () => formSearch.page,
  async () => {
    load.value = true;
    await storeReview.getAllReview(formSearch);
    load.value = false;
  }
);

const numPages = computed(() => storeReview.totalPages);

const currentPageHuman = computed(() => formSearch.page + 1);

const onClickHandler = async (value) => {
  formSearch.page = value - 1;
  await storeReview.getAllReview(formSearch);
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
  await storeReview.getAllReview(formSearch);
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
  <CardBoxModal v-model="isModalActive" title="Thông tin khách hàng">
    <div v-if="customerDetail">
      <div class="mt-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Tên khách hàng
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ customerDetail.name }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Email</dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ customerDetail.email }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Số điện thoại
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ customerDetail.phoneNumber }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Ngày tạo
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ customerDetail.createdDate }}
            </dd>
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Ngày cập nhật
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ customerDetail.updatedDate }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Ngày sinh
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ customerDetail.dob }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Tuổi</dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ customerDetail.age }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Hoạt động
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ customerDetail.active ? "Đang hoạt động" : "Dừng hoạt động" }}
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
    title="Xóa khách hàng"
    button="danger"
    has-cancel
    @confirm="deleteCustomer(customerDetail.id)"
  >
    <p v-if="customerDetail">
      Bạn có muốn xóa tài khoản <b>{{ customerDetail.name }}</b> có email là
      <b>{{ customerDetail.email }}</b>
    </p>
    <p v-else>loading...</p>
  </CardBoxModal>

  <table class="text-sm">
    <thead>
      <tr class="text-center">
        <th v-if="checkable" />
        <th>Sản phẩm</th>
        <th>Người đánh giá</th>
        <th>Đánh giá</th>
        <th>Ngày đánh giá</th>
        <th>Trạng thái</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id">
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />

        <td data-label="Product">
          <div class="flex">
            <UserAvatar
              :username="client.name"
              :avatar="client.products?.images[0]?.imageName"
              class="w-18 h-24 mx-auto lg:h-20 items-center"
            />
            <b>{{ client.products.name }}</b>
          </div>
        </td>
        <td data-label="Company">
          <div class="flex flex-col">
            <b> {{ client.user.name }}</b>
            <p>{{ client.user.email }}</p>
          </div>
        </td>
        <td data-label="City">
          <star-rating
            :read-only="true"
            :rating="client.rating"
            :star-size="20"
            :show-rating="false"
            active-color="#ffd700"
          ></star-rating>

          {{ client.comment }}
        </td>
        <td>
          {{ client.createdDate }}
        </td>
        <td data-label="Created">
          {{ client.active ? "Hoạt động" : "Không hoạt động" }}
        </td>
        <!-- <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              @click="getCustomer(client.id)"
            />
            <BaseButton
              color="info"
              :icon="mdiUpdate"
              small
              :to="'/customer-orders/' + client.id"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="handleDeleteCustomer(client.id)"
            />
          </BaseButtons>
        </td> -->
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
