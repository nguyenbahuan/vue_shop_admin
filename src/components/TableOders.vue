<script setup>
import { computed, onBeforeMount, reactive, ref, watch } from "vue";
// import { useMainStore } from "@/stores/main";
import { orderStore } from "@/stores/orderStore";
import { mdiEye, mdiTrashCan, mdiUpdate } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import StatusView from "@/components/StatusView.vue";
import FormControl from "./FormControl.vue";
import FormField from "./FormField.vue";
import { defineProps } from "vue";
import toastConfig from "@/utils/toastConfig";
import orderService from "@/services/orderService";
import { VueAwesomePaginate } from "vue-awesome-paginate";

defineProps({
  checkable: Boolean,
});

const storeOrder = orderStore();

const items = computed(() => storeOrder.orders);

const isModalDangerActive = ref(false);
const isModalUpdate = ref(false);

const oder = ref(null);

const formStatus = reactive({
  satatus: "",
  note: "",
});

const selectOptions = [
  { id: 0, name: "Đang chờ duyệt" },
  { id: 1, name: "Duyệt đơn hàng" },
  { id: 2, name: "Từ chối" },
  { id: 3, name: "Đang giao" },
  { id: 4, name: "Giao thành công" },
  { id: 5, name: "Hủy đơn hàng" },
];
const hanldeUpdateStatus = async () => {
  const formData = new FormData();
  formData.append("status", formStatus.satatus);
  formData.append("note", formStatus.note);
  const res = await orderService.updateStatusOder(oder.value.id, formData);
  if (res?.statusCode === 1) {
    toastConfig.toastSuccses(res?.message);
    await storeOrder.getAllOrders(formSearch);
    formStatus.note = "";
    formStatus.satatus = "";
  } else {
    toastConfig.toastError(res?.message);
  }
};
const getOderStatus = async (id) => {
  isModalUpdate.value = true;
  const res = await orderService.getOder(id);
  oder.value = res;
  formStatus.satatus = oder.value.status;
};
const handleCanelOrder = async (id) => {
  isModalDangerActive.value = true;
  oder.value = null;
  const res = await orderService.getOder(id);
  oder.value = res;
};
const CanelOrder = async (id) => {
  const formData = new FormData();
  formData.append("status", 5);
  formData.append("note", formStatus.note);
  const res = await orderService.updateStatusOder(id, formData);
  console.log(res);
  if (res?.statusCode === 1) {
    toastConfig.toastSuccses(res?.message);
    await storeOrder.getAllOrders(formSearch);
    formStatus.note = "";
    formStatus.satatus = "";
  } else {
    toastConfig.toastError(res?.message);
  }
  await storeOrder.getAllOrders(formSearch);
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
    await storeOrder.getAllOrders(formSearch);
  }
);

const numPages = computed(() => storeOrder.totalPages);

const currentPageHuman = computed(() => formSearch.page + 1);

const onClickHandler = async (value) => {
  formSearch.page = value - 1;
  await storeOrder.getAllOrders(formSearch);
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
  await storeOrder.getAllOrders(formSearch);
  load.value = false;
  console.log(storeOrder.orders);
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
  <CardBoxModal
    v-model="isModalUpdate"
    title="Cập nhật đơn hàng"
    button="success"
    has-cancel
    buttonLabel="Cập nhật"
    @confirm="hanldeUpdateStatus"
  >
    <FormField label="Trạng thái">
      <FormControl v-model="formStatus.satatus" :options="selectOptions" />
    </FormField>
    <FormField label="Ghi chú">
      <FormControl v-model="formStatus.note" type="textarea" />
    </FormField>
  </CardBoxModal>
  <CardBoxModal
    v-model="isModalDangerActive"
    title="Hủy đơn hàng"
    button="danger"
    has-cancel
    buttonLabel="Hủy"
    @confirm="CanelOrder(oder.id)"
  >
    <p v-if="oder">
      Bạn có muốn hủy đơn hàng <b>{{ oder.id }}</b> ???
      <FormField label="Ghi chú">
        <FormControl v-model="formStatus.note" type="textarea" />
      </FormField>
    </p>
    <p v-else>loading...</p>
  </CardBoxModal>

  <table class="min-h-[400px]" v-if="storeOrder.orders.length > 0">
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>STT</th>
        <th>Tên người đặt</th>
        <th>Địa chỉ</th>
        <th>Phương thức thanh toán</th>
        <th>Ngày đặt</th>
        <th>Trạng thái</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id">
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />
        <td data-label="Id">
          {{ client.id }}
        </td>
        <td data-label="Name">
          {{ client.username }}
        </td>
        <td data-label="Company">
          {{ client.address }}
        </td>
        <td data-label="City">
          {{ client.payMethod }}
        </td>
        <td data-label="Progress">
          {{ client.createdDate }}
        </td>
        <td data-label="Created">
          <StatusView :status="client.status" />
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiEye"
              :to="'orders-detail/' + client.id"
              small
            />
            <BaseButton
              color="info"
              :icon="mdiUpdate"
              small
              @click="getOderStatus(client.id)"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="handleCanelOrder(client.id)"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <table v-else>
    <CardBoxComponentEmpty></CardBoxComponentEmpty>
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
