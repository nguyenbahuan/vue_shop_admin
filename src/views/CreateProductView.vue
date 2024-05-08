<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="Sản Phẩm"
        main
      >
      </SectionTitleLineWithButton>
      <CardBox>
        <FormField label="Tên sản phẩm" :error="newErrors?.name">
          <FormControl
            v-model="form.name"
            :icon="mdiAccount"
            :error="newErrors?.name ? true : false"
          />
        </FormField>

        <FormField label="Giá" :error="newErrors?.price">
          <FormControl
            v-model="form.price"
            type="number"
            :error="newErrors?.price ? true : false"
          />
        </FormField>
        <FormField label="Số lượng" :error="newErrors?.totalQuantity">
          <FormControl
            v-model="form.totalQuantity"
            type="number"
            :error="newErrors?.totalQuantity ? true : false"
          />
        </FormField>

        <FormField label="Danh mục sản phẩm" :error="newErrors?.categoryId">
          <FormControl
            v-model="form.categoryId"
            :options="selectOptions"
            :error="newErrors?.categoryId ? true : false"
          />
        </FormField>

        <FormField label="Mô tả" :error="newErrors?.description">
          <FormControl
            v-model="form.description"
            type="textarea"
            :error="newErrors?.description ? true : false"
          />
        </FormField>
        <FormField label="Mô tả" :error="newErrors?.images">
          <FormFilePicker label="Upload" @update:model-value="upload" />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton
              type="submit"
              color="info"
              label="Thêm"
              @click="submit"
            />
            <BaseButton
              type="reset"
              color="info"
              outline
              label="Trở lại"
              @click="router.back()"
            />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import { reactive, ref, onBeforeMount } from "vue";
import { mdiBallotOutline, mdiAccount } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import categoryService from "@/services/categoryService";
import productService from "@/services/productsService";
import toastConfig from "@/utils/toastConfig";
import router from "@/router";
import schema from "@/utils/schema";
import useValidate from "@/utils/validate";

const selectOptions = ref(null);
const { validate, newErrors } = useValidate();

const form = reactive({
  name: "",
  price: "",
  totalQuantity: "",
  categoryId: "",
  description: "",
  images: [],
});
const upload = (value) => {
  form.images = Array.from(value);
};
const submit = async () => {
  const isValid = validate(schema.schemaCreateProduct, form);
  if (isValid) {
    const formData = new FormData();
    for (let i = 0; i < form.images.length; i++) {
      formData.append("images", form.images[i]);
    }
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("totalQuantity", form.totalQuantity);
    formData.append("categoryId", form.categoryId);
    formData.append("description", form.description);
    // formData.append("images", listImage);

    const res = await productService.createProduct(formData);
    if (res?.payload?.statusCode === 1) {
      toastConfig.toastSuccses(res?.payload?.message);
      form.name = "";
      form.price = "";
      form.totalQuantity = "";
      form.categoryId = "";
      form.description = "";
      form.images = [];
      setTimeout(() => {
        router.push("/products");
      }, 1500);
    } else {
      toastConfig.toastError(res?.payload?.message);
    }
  }
};

onBeforeMount(async () => {
  const res = await categoryService.fetchAllCategory();
  const resPro = await productService.detailProduct(1);
  selectOptions.value = res;
  console.log(resPro);
});
</script>

<style scoped></style>
