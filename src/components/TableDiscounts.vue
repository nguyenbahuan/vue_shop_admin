<script setup>
import { computed, onBeforeMount, reactive, ref } from "vue";
import { mdiEye, mdiTrashCan, mdiUpdate } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { defineProps } from "vue";
import { discountStore } from "@/stores/discountStore";
import discountsService from "@/services/discountsService";
import toastConfig from "@/utils/toastConfig";
import TableProductDiscount from "@/components/TableProductDiscount.vue";
import schema from "@/utils/schema";
import useValidate from "@/utils/validate";
import { VueAwesomePaginate } from "vue-awesome-paginate";

defineProps({
  checkable: Boolean,
});

const { validate, newErrors } = useValidate();

const storeDiscount = discountStore();

const items = computed(() => storeDiscount.discounts);

const isModalActive = ref(false);

const isModalUpdateActive = ref(false);

const isModalDangerActive = ref(false);

const currentPage = ref(1);
const formSearch = reactive({
  page: 0,
  pageSize: 5,
});
const form = reactive({
  id: "",
  name: "",
  percent: "",
});
const formDate = reactive({
  startDate: "",
  endDate: "",
});
const checkedRows = ref([]);
const listProducts = ref([]);
const itemsPaginated = computed(() => items.value);

const numPages = computed(() => storeDiscount.totalPages);

const currentPageHuman = computed(() => formSearch.page + 1);

const onClickHandler = async (value) => {
  formSearch.page = value - 1;
  await storeDiscount.getAlldiscounts(formSearch);
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

const showDetailDiscount = async (id) => {
  isModalActive.value = true;
  const res = await discountsService.getDiscounts(id);
  form.id = res.id;
  form.name = res.discountName;
  form.percent = res.discountPercentage;
};

const getDetailDiscount = async (id) => {
  isModalUpdateActive.value = true;
  const res = await discountsService.getDiscounts(id);
  form.id = res.id;
  form.name = res.discountName;
  form.percent = res.discountPercentage;
};

const handleDiscount = async (id) => {
  isModalDangerActive.value = true;
  const res = await discountsService.getDiscounts(id);
  form.id = res.id;
  form.name = res.discountName;
  form.percent = res.discountPercentage;
};

const updateDiscount = async () => {
  const isValid = validate(schema.schemaDiscount, form);
  if (isValid) {
    const formData = new FormData();
    formData.append("discountName", form.name);
    formData.append("discountPercentage", form.percent);
    const res = await discountsService.updateDiscounts(form.id, formData);
    if (res?.statusCode === 1) {
      toastConfig.toastSuccses(res?.message);
      await discountStore().getAlldiscounts();
    } else {
      toastConfig.toastError(res?.message);
    }
  } else isModalUpdateActive.value = true;
};
const deleteDiscount = async () => {
  const res = await discountsService.deleteDiscounts(form.id);
  if (res?.statusCode === 1) {
    toastConfig.toastSuccses(res?.message);
    await discountStore().getAlldiscounts();
  } else {
    toastConfig.toastError(res?.message);
  }
};
const addDiscount = async () => {
  const formData = new FormData();

  for (let i = 0; i < listProducts.value.length; i++) {
    formData.append("productId[]", listProducts.value[i].id);
  }
  formData.append("discountId", form.id);
  formData.append("startDate", formDate.startDate);
  formData.append("endDate", formDate.endDate);

  const res = await discountsService.createProductDiscounts(formData);
  if (res?.statusCode === 1) {
    toastConfig.toastSuccses(res?.message);
    await discountStore().getAlldiscounts();
  } else {
    toastConfig.toastError(res?.message);
  }
};

const getListProduct = (value) => {
  listProducts.value = value;
};
onBeforeMount(async () => {
  await storeDiscount.getAlldiscounts(formSearch);
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
    <FormField label="Tên Discount" :error="newErrors?.name">
      <FormControl
        v-model="form.name"
        :error="newErrors?.name ? true : false"
      />
    </FormField>
    <FormField
      label="Phần trăm"
      help="Nhập từ 0 đến 1."
      :error="newErrors?.percent"
    >
      <FormControl
        v-model="form.percent"
        :error="newErrors?.percent ? true : false"
      />
    </FormField>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Xóa discounts"
    button="danger"
    has-cancel
    @confirm="deleteDiscount"
  >
    <p>
      Bạn có muốn xóa discounts <b>{{ form.name }}</b>
    </p>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalActive"
    title="Xem discounts"
    button="info"
    has-cancel
    @confirm="addDiscount"
  >
    <TableProductDiscount
      @checked="getListProduct"
      checkable
    ></TableProductDiscount>
    <FormField label="Ngày bắt đầu">
      <FormControl v-model="formDate.startDate" type="date" />
    </FormField>
    <FormField label="Ngày kết thúc">
      <FormControl v-model="formDate.endDate" type="date" />
    </FormField>
  </CardBoxModal>
  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>Tên</th>
        <th>Phần trăm</th>
        <th>Hoạt động</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id">
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />
        <td data-label="Name">
          {{ client.discountName }}
        </td>
        <td data-label="Company">{{ client.discountPercentage * 100 }}%</td>

        <td data-label="Created">
          {{ client.active ? "Đang hoạt động" : "Đừng hoạt động" }}
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              @click="showDetailDiscount(client.id)"
            />
            <BaseButton
              color="info"
              :icon="mdiUpdate"
              small
              @click="getDetailDiscount(client.id)"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="handleDiscount(client.id)"
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
