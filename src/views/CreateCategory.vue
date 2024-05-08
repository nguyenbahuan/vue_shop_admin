<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="Thêm danh mục"
        main
      >
      </SectionTitleLineWithButton>
      <CardBox>
        <FormField label="Tên danh mục" :error="newErrors?.name">
          <FormControl
            v-model="form.name"
            :icon="mdiAccount"
            :error="newErrors?.name ? true : false"
          />
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
import { reactive } from "vue";
import { mdiBallotOutline, mdiAccount } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import categoryService from "@/services/categoryService";
import toastConfig from "@/utils/toastConfig";
import { useRouter } from "vue-router";
import schema from "@/utils/schema";
import useValidate from "@/utils/validate";

const { newErrors, validate } = useValidate();
const form = reactive({
  name: "",
});
const router = useRouter();
const submit = async () => {
  const isValid = validate(schema.schemaCategory, form);
  if (isValid) {
    const formData = new FormData();

    formData.append("name", form.name);

    const res = await categoryService.createCategory(formData);
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
</script>

<style scoped></style>
