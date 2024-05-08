<script setup>
import { mdiSale, mdiPlus } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import TableDiscounts from "@/components/TableDiscounts.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { reactive, ref } from "vue";
import discountsService from "@/services/discountsService";
import toastConfig from "@/utils/toastConfig";
import { discountStore } from "@/stores/discountStore";
import schema from "@/utils/schema";
import useValidate from "@/utils/validate";
import TableListDiscountProduct from "@/components/TableListDiscountProduct.vue";

const { validate, newErrors } = useValidate();
const storeDiscount = discountStore();
const isModalActive = ref(false);
const form = reactive({
  name: "",
  percent: "",
});
const createDiscount = async () => {
  const isValid = validate(schema.schemaDiscount, form);
  console.log(newErrors);
  if (isValid) {
    const formData = new FormData();
    formData.append("discountName", form.name);
    formData.append("discountPercentage", parseFloat(form.percent));

    const res = await discountsService.createDiscounts(formData);
    if (res?.statusCode === 1) {
      toastConfig.toastSuccses(res?.message);
      form.name = "";
      form.percent = "";
      await storeDiscount.getAlldiscounts();
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
      title="Thêm Discounts"
      has-cancel
      button="success"
      buttonLabel="Thêm"
      @confirm="createDiscount"
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
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiSale" title="Giảm giá" main>
      </SectionTitleLineWithButton>
      <BaseButton
        class="my-3"
        color="info"
        label="Thêm Discount"
        :icon="mdiPlus"
        small
        @click="isModalActive = true"
      />
      <CardBox class="mb-6 shadow-2xl" has-table>
        <TableDiscounts />
      </CardBox>

      <CardBox>
        <TableListDiscountProduct />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
