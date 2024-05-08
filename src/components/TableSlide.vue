<script setup>
import { computed, onBeforeMount, reactive, ref } from "vue";
import { mdiTrashCan, mdiUpdate } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { defineProps } from "vue";
import { sliderStore } from "@/stores/sliderStore";
import sliderService from "@/services/sliderService";
import toastConfig from "@/utils/toastConfig";
import schema from "@/utils/schema";
import useValidate from "@/utils/validate";
import { HOST_IMG } from "@/services/constant";
import FormFilePicker from "@/components/FormFilePicker.vue";
import { VueAwesomePaginate } from "vue-awesome-paginate";

defineProps({
  checkable: Boolean,
});

const { validate, newErrors } = useValidate();

const storeSlider = sliderStore();

const items = computed(() => storeSlider.sliders);

const isModalUpdateActive = ref(false);

const isModalDangerActive = ref(false);

const currentPage = ref(1);
const formSearch = reactive({
  page: 0,
  pageSize: 5,
});
const formSlider = reactive({
  content: "",
});
const infoSlider = ref(null);
const listImage = ref([]);
const upload = (value) => {
  listImage.value = Array.from(value);
};
const checkedRows = ref([]);
const itemsPaginated = computed(() => items.value);

const numPages = computed(() => storeSlider.totalPages);
const currentPageHuman = computed(() => formSearch.page + 1);
const onClickHandler = async (value) => {
  formSearch.page = value - 1;
  await storeSlider.getAllSlider(formSearch);
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

const getDetailSlider = async (id) => {
  isModalUpdateActive.value = true;
  const res = await sliderService.getSlider(id);
  infoSlider.value = res;
  formSlider.id = res.id;
  formSlider.content = res.content;
};

const handleDiscount = async (id) => {
  isModalDangerActive.value = true;
  const res = await sliderService.getSlider(id);
  formSlider.id = res.id;
  formSlider.content = res.content;
};

const updateSlider = async () => {
  console.log(formSlider);
  const isValid = validate(schema.schemaUpdateSlider, formSlider);
  console.log(formSlider);
  if (isValid) {
    const formData = new FormData();
    for (let i = 0; i < listImage.value.length; i++) {
      formData.append("images", listImage.value[i]);
    }
    formData.append("content", formSlider.content);
    const res = await sliderService.updateSlider(infoSlider.value.id, formData);
    if (res?.statusCode === 1) {
      toastConfig.toastSuccses(res?.message);
      await sliderStore().getAllSlider(formSearch);
    } else {
      toastConfig.toastError(res?.message);
    }
  } else isModalUpdateActive.value = true;
};
const deleteDiscount = async () => {
  const res = await sliderService.deleteSlider(formSlider.id);
  if (res?.statusCode === 1) {
    toastConfig.toastSuccses(res?.message);
    await sliderStore().getAllSlider(formSearch);
  } else {
    toastConfig.toastError(res?.message);
  }
};

onBeforeMount(async () => {
  await storeSlider.getAllSlider(formSearch);
});
</script>

<template>
  <CardBoxModal
    v-model="isModalUpdateActive"
    title="Sửa Slider"
    has-cancel
    button="info"
    buttonLabel="Sửa"
    @confirm="updateSlider"
  >
    <FormField label="Ảnh">
      <FormFilePicker
        label="Upload"
        v-model="listImage"
        @update:model-value="upload"
      />
    </FormField>
    <FormField label="Nội dung" :error="newErrors?.content">
      <FormControl
        type="textarea"
        v-model="formSlider.content"
        :error="newErrors?.content ? true : false"
      />
    </FormField>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Xóa Slider"
    button="danger"
    has-cancel
    @confirm="deleteDiscount"
  >
    <p>Bạn có muốn xóa slider</p></CardBoxModal
  >

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>Ảnh</th>
        <th>Nội dung</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id">
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />
        <td data-label="Name">
          <img :src="HOST_IMG + '/' + client.image" alt="" />
        </td>
        <td data-label="Company">{{ client.content }}</td>

        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiUpdate"
              small
              @click="getDetailSlider(client.id)"
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
