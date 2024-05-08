<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="Thêm Discount"
        main
      >
      </SectionTitleLineWithButton>
      <CardBox>
        <FormField label="Tên Discount">
          <FormControl v-model="form.name" />
        </FormField>
        <FormField label="Phần trăm" help="Nhập từ 0 đến 1.">
          <FormControl v-model="form.percent" />
        </FormField>

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
import { reactive } from "vue";
import { mdiBallotOutline } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import discountsService from "@/services/discountsService";
import toastConfig from "@/utils/toastConfig";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useRouter } from "vue-router";

const form = reactive({
  name: "",
  percent: "",
});
const router = useRouter();
const submit = async () => {
  const formData = new FormData();
  formData.append("discountName", form.name);
  formData.append("discountPercentage", parseFloat(form.percent));

  const res = await discountsService.createDiscount(formData);
  if (res?.statusCode === 1) {
    toastConfig.toastSuccses(res?.message);
    setTimeout(() => {
      router.back();
    }, 1000);
  } else {
    toastConfig.toastError(res?.message);
  }
};
</script>

<style scoped></style>
