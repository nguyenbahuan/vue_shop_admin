<script setup>
import { onBeforeMount, reactive, ref } from "vue";
// import { useMainStore } from "@/stores/main";
import { authStore } from "@/stores/authStore";
import {
  mdiAccount,
  mdiMail,
  mdiAsterisk,
  mdiFormTextboxPassword,
} from "@mdi/js";
import toastConfig from "@/utils/toastConfig";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import userService from "@/services/userService";
import useValidate from "@/utils/validate";
import schema from "@/utils/schema";

const storeAuth = authStore();
const userProfile = ref(null);
const { validate, newErrors } = useValidate();

const profileForm = reactive({
  avatar: [],
  name: storeAuth.user?.name,
  email: storeAuth.user?.email,
});

const passwordForm = reactive({
  password_current: null,
  password: null,
  password_confirmation: null,
});
const listImage = ref([]);
const upload = (value) => {
  listImage.value = Array.from(value);
};
// const errors = ref([]);

// const validateData = () => {
//   const schema = {
//     type: "object",
//     properties: {
//       password_current: {
//         type: "string",
//         minLength: 6,
//         errorMessage: {
//           type: "Không phải string",
//           minLength: "password không đủ 6 kí tự",
//           _: "sai ",
//         },
//       },
//       password: { type: "string", minLength: 6 },
//       password_confirmation: { type: "string", minLength: 6 },
//     },
//     required: ["password_current", "password", "password_confirmation"],
//     additionalProperties: false,
//   };
//   const validate = ajv.compile(schema);
//   const isValid = validate(passwordForm);

//   if (!isValid) {
//     errors.value = [];
//     errors.value = validate.errors.map((error) => {
//       return {
//         field: error.instancePath.slice(1),
//         message: error.message,
//       };
//     });
//     console.log(errors.value);
//     return !errors.value;
//   } else {
//     errors.value = [];
//     console.log(errors);
//     return true;
//   }
// };
// const getErrorForField = (fieldName) => {
//   const error = errors.value.find((e) => e.field === fieldName);
//   return error ? error.message : null;
// };
// const retrunErrorForField = (fieldName) => {
//   const error = errors.value.find((e) => e.field === fieldName);
//   return error ? true : false;
// };
const submitProfile = async () => {
  const isValid = validate(schema.schemaProfile, profileForm);
  if (isValid) {
    const formData = new FormData();
    for (let i = 0; i < listImage.value.length; i++) {
      formData.append("avatar", listImage.value[i]);
    }
    formData.append("name", profileForm.name);
    const res = await userService.updateProfile(formData);
    if (res.statusCode === 1) {
      toastConfig.toastSuccses(res.message);
      userProfile.value = storeAuth.user;
      storeAuth.checkOutStore();
      listImage.value = [];
    } else {
      toastConfig.toastError(res.message);
    }
  }
};

const submitPass = async () => {
  const isValid = validate(schema.schemaChangPass, passwordForm);
  if (isValid) {
    const formData = new FormData();
    formData.append("oldPassword", passwordForm.password_current);
    formData.append("newPassword", passwordForm.password);
    formData.append("confirmPassword", passwordForm.password_confirmation);

    const res = await userService.changePass(formData);
    if (res.statusCode === 1) {
      toastConfig.toastSuccses(res.message);
      passwordForm.password = "";
      passwordForm.password_current = "";
      passwordForm.password_confirmation = "";
    } else toastConfig.toastError(res.message);
  }
};
const load = ref(true);
onBeforeMount(() => {
  userProfile.value = storeAuth.user;
  if (userProfile.value) {
    load.value = false;
  }
});
</script>

<template>
  <LayoutAuthenticated>
    <div
      v-if="load"
      class="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50"
    >
      <div class="flex justify-center items-center mt-[50vh]">
        <font-awesome-icon
          :icon="['fas', 'spinner']"
          class="animate-spin text-lg"
        />
      </div>
    </div>
    <SectionMain v-if="userProfile">
      <SectionTitleLineWithButton :icon="mdiAccount" title="Thông tin" main>
      </SectionTitleLineWithButton>

      <UserCard class="mb-6" />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardBox is-form @submit.prevent="submitProfile">
          <FormField label="Ảnh">
            <FormFilePicker
              v-model="listImage"
              name="avatar"
              label="Upload"
              @update:model-value="upload"
              error
            />
          </FormField>

          <FormField label="Tên" :error="newErrors?.name">
            <FormControl
              v-model="profileForm.name"
              :icon="mdiAccount"
              name="name"
              autocomplete="username"
              :error="newErrors?.name ? true : false"
            />
          </FormField>
          <FormField label="E-mail" :error="newErrors?.email">
            <FormControl
              v-model="profileForm.email"
              :icon="mdiMail"
              type="email"
              name="email"
              required
              readonly
              autocomplete="email"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton color="info" type="submit" label="Gửi" />
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox is-form @submit.prevent="submitPass">
          <FormField
            label="Mật khẩu hiện tại"
            :error="newErrors?.password_current"
          >
            <FormControl
              v-model="passwordForm.password_current"
              :icon="mdiAsterisk"
              name="password_current"
              type="password"
              autocomplete="current-password"
              :error="newErrors?.password_current ? true : false"
            />
          </FormField>

          <BaseDivider />

          <FormField label="Mật khẩu mới" :error="newErrors?.password">
            <FormControl
              v-model="passwordForm.password"
              :icon="mdiFormTextboxPassword"
              name="password"
              type="password"
              autocomplete="new-password"
              :error="newErrors?.password ? true : false"
            />
          </FormField>

          <FormField
            label="Xác nhận mật khẩu"
            :error="newErrors?.password_confirmation"
          >
            <FormControl
              v-model="passwordForm.password_confirmation"
              :icon="mdiFormTextboxPassword"
              name="password_confirmation"
              type="password"
              autocomplete="new-password"
              :error="newErrors?.password_confirmation ? true : false"
            />
          </FormField>
          <template #footer>
            <BaseButtons>
              <BaseButton type="submit" color="info" label="Gửi" />
            </BaseButtons>
          </template>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
