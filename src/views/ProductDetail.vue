<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="Chi tiết sản phẩm"
        main
      >
      </SectionTitleLineWithButton>
      <CardBox>
        <FormField :error="newErrors?.name" label="Tên sản phẩm">
          <FormControl
            :error="newErrors?.name ? true : false"
            v-model="form.name"
            :icon="mdiAccount"
          />
        </FormField>

        <FormField :error="newErrors?.price" label="Giá">
          <FormControl
            :error="newErrors?.price ? true : false"
            v-model="form.price"
            type="number"
          />
        </FormField>
        <FormField :error="newErrors?.totalQuantity" label="Số lượng">
          <FormControl
            :error="newErrors?.totalQuantity ? true : false"
            v-model="form.totalQuantity"
            type="number"
          />
        </FormField>

        <FormField :error="newErrors?.categoryId" label="Danh mục sản phẩm">
          <FormControl
            :error="newErrors?.categoryId ? true : false"
            v-model="form.categoryId"
            :options="selectOptions"
          />
        </FormField>

        <FormField :error="newErrors?.description" label="Mô tả">
          <FormControl
            :error="newErrors?.description ? true : false"
            v-model="form.description"
            type="textarea"
          />
        </FormField>
        <FormFilePicker label="Upload" @update:model-value="upload" />

        <template #footer>
          <BaseButtons>
            <BaseButton
              type="submit"
              color="info"
              label="Submit"
              @click="submit"
            />
            <BaseButton type="reset" color="info" outline label="Reset" />
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
import { useRoute, useRouter } from "vue-router";
import schema from "@/utils/schema";
import useValidate from "@/utils/validate";

const { validate, newErrors } = useValidate();
const selectOptions = ref(null);
const route = useRoute();
const router = useRouter();
const productsDetail = ref(null);

const form = reactive({
  name: "",
  price: "",
  totalQuantity: "",
  categoryId: "",
  description: "",
  images: [],
});

console.log(productsDetail.value);
const listImage = ref([]);
const upload = (value) => {
  listImage.value = Array.from(value);
};
const submit = async () => {
  const isValid = validate(schema.schemaUpdateProduct, form);
  if (isValid) {
    const formData = new FormData();
    for (let i = 0; i < listImage.value.length; i++) {
      formData.append("images", listImage.value[i]);
    }
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("totalQuantity", form.totalQuantity);
    formData.append("categoryId", form.categoryId);
    formData.append("description", form.description);
    // formData.append("images", listImage);

    const res = await productService.updateProduct(route.params?.id, formData);
    if (res?.payload?.statusCode === 1) {
      toastConfig.toastSuccses(res?.payload?.message);

      setTimeout(() => {
        router.back();
      }, 1000);
    } else {
      toastConfig.toastError(res?.payload?.message);
    }
  }
};

onBeforeMount(async () => {
  const res = await categoryService.fetchAllCategory();
  const resPro = await productService.detailProduct(route.params?.id);
  selectOptions.value = res;
  productsDetail.value = resPro?.payload;
  form.name = productsDetail.value.name;
  form.price = productsDetail.value.price;
  form.categoryId = productsDetail.value.category.id;
  form.description = productsDetail.value.description;
  form.totalQuantity = productsDetail.value.totalQuantity;
  console.log(resPro?.payload);
});
</script>

<style scoped></style>
