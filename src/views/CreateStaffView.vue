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
        <FormField label="Tên nhân viên" :error="newErrors?.name">
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
        <FormField :error="newErrors?.password" label="Mật khẩu">
          <FormControl
            :error="newErrors?.password ? true : false"
            v-model="form.password"
            type="text"
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
        <FormField :error="newErrors?.avatar" label="Ảnh">
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
import toastConfig from "@/utils/toastConfig";
// import userService from "@/services/userService";
import rolesService from "@/services/roleService";
import userService from "@/services/userService";
import { useRouter } from "vue-router";
import schema from "@/utils/schema";
import useValidate from "@/utils/validate";

const { validate, newErrors } = useValidate();
const router = useRouter();
const selectOptions = ref([]);

const form = reactive({
  name: "",
  email: "",
  password: "",
  roleId: "",
  dob: "",
  phoneNumber: "",
  avatar: [],
});
const upload = (value) => {
  form.avatar = Array.from(value);
};
const submit = async () => {
  const isValid = validate(schema.schemaCreateStaff, form);
  if (isValid) {
    const formData = new FormData();
    for (let i = 0; i < form.avatar.length; i++) {
      formData.append("avatar", form.avatar[i]);
    }
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("dob", form.dob);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("roleId", form.roleId);
    // formData.append("images", listImage);

    const res = await userService.createStaff(formData);
    if (res?.payload?.statusCode === 1) {
      toastConfig.toastSuccses(res?.payload?.message);
      form.name = "";
      form.email = "";
      form.password = "";
      form.roleId = "";
      form.dob = "";
      form.phoneNumber = "";
      form.avatar = [];
      setTimeout(() => {
        router.push("/staffs");
      }, 1500);
    } else {
      toastConfig.toastError(res?.payload?.message);
    }
  }
};

onBeforeMount(async () => {
  const res = await rolesService.fetchAllRole();
  for (let k = 0; k < res.length; k++) {
    if (res[k].name !== "USER") {
      selectOptions.value.push(res[k]);
    }
  }
});
</script>

<style scoped></style>
