<script setup>
import { computed, onBeforeMount, reactive, ref, watch } from "vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import { discountProductStore } from "@/stores/discountProductStore";
import { mdiTrashCan, mdiUpdate } from "@mdi/js";
import discountsService from "@/services/discountsService";
import toastConfig from "@/utils/toastConfig";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { VueAwesomePaginate } from "vue-awesome-paginate";

// const mainStore = useMainStore();
const storeDiscountProduct = discountProductStore();

const isModalUpdateActive = ref(false);

const isModalDangerActive = ref(false);

const items = computed(() => storeDiscountProduct.discountProduct);

const currentDiscountProduct = ref(null);
const currentPage = ref(1);
const formSearch = reactive({
  page: 0,
  pageSize: 5,
});

const formProductDiscount = reactive({
  productId: "",
  discountId: "",
  startDate: "",
  endDate: "",
});

const itemsPaginated = computed(() => items.value);
watch(
  () => formSearch.page,
  async () => {
    await storeDiscountProduct.getAlldiscountProduct(formSearch);
  }
);

const numPages = computed(() => storeDiscountProduct.totalPages);

const currentPageHuman = computed(() => formSearch.page + 1);

const onClickHandler = async (value) => {
  formSearch.page = value - 1;
  await storeDiscountProduct.getAlldiscountProduct(formSearch);
};
const handleUpdate = async (id) => {
  isModalUpdateActive.value = true;
  const res = await discountsService.getDiscountsProduct(id);
  currentDiscountProduct.value = res;
  formProductDiscount.productId = currentDiscountProduct.value.products.id;
  formProductDiscount.discountId = currentDiscountProduct.value.discounts.id;
  formProductDiscount.startDate = currentDiscountProduct.value.startDate;
  formProductDiscount.endDate = currentDiscountProduct.value.endDate;
};
const updateDiscount = async () => {
  const res = await discountsService.updateDiscountsProduct(
    currentDiscountProduct.value.id,
    formProductDiscount
  );
  if (res.statusCode === 1) {
    toastConfig.toastSuccses(res.message);
    await storeDiscountProduct.getAlldiscountProduct(formSearch);
    isModalDangerActive.value = false;
  } else toastConfig.toastError(res.message);
};
const handleDelete = async (id) => {
  isModalDangerActive.value = true;
  const res = await discountsService.getDiscountsProduct(id);
  currentDiscountProduct.value = res;
};
const deleteDiscount = async () => {
  const res = await discountsService.deleteDiscountsProduct(
    currentDiscountProduct.value.id
  );
  if (res.statusCode === 1) {
    toastConfig.toastSuccses(res.message);
    await storeDiscountProduct.getAlldiscountProduct(formSearch);
    isModalDangerActive.value = false;
  } else toastConfig.toastError(res.message);
};
onBeforeMount(async () => {
  await storeDiscountProduct.getAlldiscountProduct(formSearch);
});
</script>

<template>
  <CardBoxModal
    v-model="isModalUpdateActive"
    title="Sửa Discount"
    has-cancel
    button="info"
    buttonLabel="Sửa"
    @confirm="updateDiscount"
  >
    <FormField label="Sản phẩm">
      <FormControl readonly v-model="formProductDiscount.productId" />
    </FormField>
    <FormField label="Discount">
      <FormControl readonly v-model="formProductDiscount.discountId" />
    </FormField>
    <FormField label="Ngày bắt đầu">
      <FormControl v-model="formProductDiscount.startDate" type="date" />
    </FormField>
    <FormField label="Ngày kết thúc">
      <FormControl v-model="formProductDiscount.endDate" type="date" />
    </FormField>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Xóa discounts"
    button="danger"
    has-cancel
    button-label="Xóa"
    @confirm="deleteDiscount"
  >
    <p>Bạn có muốn xóa discounts <b></b></p>
  </CardBoxModal>
  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>#</th>
        <th>Tên sản phẩm</th>
        <th>Giảm giá</th>
        <th>Phần trăm</th>
        <th>Ngày bắt đầu</th>
        <th>Ngày kết thúc</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id">
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />

        <td>
          {{ client.id }}
        </td>

        <td>{{ client.products.name }}</td>
        <td>{{ client.discounts.discountName }}</td>
        <td>{{ client.discounts.discountPercentage * 100 }} %</td>
        <td>{{ client.startDate }}</td>
        <td>{{ client.endDate }}</td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiUpdate"
              small
              @click="handleUpdate(client.id)"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="handleDelete(client.id)"
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
