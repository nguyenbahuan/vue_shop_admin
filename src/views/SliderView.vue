<script setup>
import { mdiSale, mdiPlus } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import TableSlide from "@/components/TableSlide.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormField from "@/components/FormField.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormControl from "@/components/FormControl.vue";
import { reactive, ref } from "vue";
import sliderService from "@/services/sliderService";
import toastConfig from "@/utils/toastConfig";
import { sliderStore } from "@/stores/sliderStore";
import schema from "@/utils/schema";
import useValidate from "@/utils/validate";

const { validate, newErrors } = useValidate();
const storeSlider = sliderStore();
const isModalActive = ref(false);
const form = reactive({
  image: [],
  content: "",
});
const upload = (value) => {
  form.image = value;
};
const createSlider = async () => {
  const isValid = validate(schema.schemaCreateSlider, form);
  if (isValid) {
    const formData = new FormData();
    for (let i = 0; i < form.image.length; i++) {
      formData.append("images", form.image[i]);
    }

    formData.append("content", form.content);

    const res = await sliderService.createSlider(formData);
    if (res?.statusCode === 1) {
      toastConfig.toastSuccses(res?.message);
      form.image = "";
      form.content = "";
      await storeSlider.getAllSlider({ page: 0, pageSize: 5 });
    } else {
      toastConfig.toastError(res?.message);
    }
  } else isModalActive.value = true;
};
</script>

<template>
  <LayoutAuthenticated>
    <CardBoxModal
      v-model="isModalActive"
      title="Thêm Slider"
      has-cancel
      button="success"
      buttonLabel="Thêm"
      @confirm="createSlider"
    >
      <FormField label="Ảnh" :error="newErrors?.image">
        <FormFilePicker
          label="Upload"
          @update:model-value="upload"
          :error="newErrors?.image ? true : false"
        />
      </FormField>
      <FormField label="Nội dung" :error="newErrors?.content">
        <FormControl
          type="textarea"
          v-model="form.content"
          :error="newErrors?.content ? true : false"
        />
      </FormField>
    </CardBoxModal>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiSale" title="Slider" main>
      </SectionTitleLineWithButton>
      <BaseButton
        class="my-3"
        color="info"
        label="Thêm Slider"
        :icon="mdiPlus"
        small
        @click="isModalActive = true"
      />
      <CardBox class="mb-6 shadow-2xl" has-table>
        <TableSlide />
      </CardBox>

      <CardBox>
        <CardBoxComponentEmpty />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
