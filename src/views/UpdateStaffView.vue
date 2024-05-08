<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="Thêm nhân viên"
        main
      >
      </SectionTitleLineWithButton>
      <CardBox>
        <FormField :error="newErrors?.name" label="Tên nhân viên">
          <FormControl
            v-model="form.name"
            :icon="mdiAccount"
            :error="newErrors?.name ? true : false"
          />
        </FormField>

        <FormField :error="newErrors?.email" label="Email">
          <FormControl
            :error="newErrors?.email ? true : false"
            v-model="form.email"
            type="email"
          />
        </FormField>

        <FormField :error="newErrors?.roleId" label="Vai trò">
          <FormControl
            :error="newErrors?.roleId ? true : false"
            v-model="form.roleId"
            :options="selectOptions"
          />
        </FormField>

        <FormField :error="newErrors?.dob" label="Ngày sinh">
          <FormControl
            :error="newErrors?.dob ? true : false"
            v-model="form.dob"
            type="date"
          />
        </FormField>
        <FormField :error="newErrors?.phoneNumber" label="Số điện thoại">
          <FormControl
            :error="newErrors?.phoneNumber ? true : false"
            v-model="form.phoneNumber"
            type="text"
          />
        </FormField>
        <FormField label="Hoạt động">
          <FormCheckRadioGroup
            v-model="buttonSettingsModel"
            name="buttons-switch"
            type="switch"
            @update:model-value="handleActice"
            :options="{
              true: 'Active',
            }"
          />
        </FormField>
        <FormField label="Ảnh">
          <FormFilePicker label="Upload" @update:model-value="upload" />
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
import toastConfig from "@/utils/toastConfig";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import rolesService from "@/services/roleService";
import userService from "@/services/userService";
import { useRoute, useRouter } from "vue-router";
import schema from "@/utils/schema";
import useValidate from "@/utils/validate";

const { validate, newErrors } = useValidate();

const router = useRouter();
const route = useRoute();
const selectOptions = ref([]);
const buttonSettingsModel = ref([]);

const form = reactive({
  name: "",
  email: "",
  roleId: "",
  dob: "",
  phoneNumber: "",
});
const listImage = ref([]);
const upload = (value) => {
  listImage.value = Array.from(value);
};
const handleActice = (value) => {
  buttonSettingsModel.value = value;
};
const submit = async () => {
  const isValid = validate(schema.schemaUpdateStaff, form);
  if (isValid) {
    const formData = new FormData();
    for (let i = 0; i < listImage.value.length; i++) {
      formData.append("avatar", listImage.value[i]);
    }
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("dob", form.dob);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("roleId", form.roleId);
    formData.append("active", buttonSettingsModel.value);
    // formData.append("images", listImage);

    const res = await userService.updateStaff(route.params.id, formData);
    if (res?.payload?.statusCode === 1) {
      toastConfig.toastSuccses(res?.payload?.message);
      form.name = "";
      form.email = "";
      form.roleId = "";
      form.dob = "";
      form.phoneNumber = "";
      listImage.value = [];
      setTimeout(() => {
        router.push("/staffs");
      }, 1500);
    } else {
      toastConfig.toastError(res?.payload?.message);
    }
  }
};

onBeforeMount(async () => {
  const resStaff = await userService.getStaff(route.params.id);
  const res = await rolesService.fetchAllRole();
  for (let k = 0; k < res.length; k++) {
    if (res[k].name !== "USER") {
      selectOptions.value.push(res[k]);
    }
  }

  form.name = resStaff.name;
  form.email = resStaff.email;
  form.roleId = resStaff.role.id;
  form.dob = resStaff.dob;
  form.phoneNumber = resStaff.phoneNumber;
  buttonSettingsModel.value = resStaff.active ? true : false;
});
</script>

<style scoped></style>
