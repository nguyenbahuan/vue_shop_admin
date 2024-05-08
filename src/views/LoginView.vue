<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import { authStore } from "@/stores/authStore";
import { toast } from "vue3-toastify";
import schema from "@/utils/schema";
import useValidate from "@/utils/validate";

const { newErrors, validate } = useValidate();
const form = reactive({
  email: "",
  password: "",
});
const load = ref(false);
const storeAuth = authStore();

const Login = async () => {
  load.value = true;
  const isValid = validate(schema.schemaLogin, form);
  if (isValid) {
    const res = await storeAuth.storeLogin(form);
    if (res.statusCode === 1) {
      toastSuccses(res.message);
      load.value = false;

      submit();
    } else {
      toastError(res.error);
      load.value = false;
    }
  }
  load.value = false;
};
const router = useRouter();

const submit = () => {
  router.push("/dashboard");
};

const toastSuccses = (mes) => {
  toast(mes, {
    type: "success",
    position: "top-right",
    autoClose: 3000,
  });
};
const toastError = (mes) => {
  toast(mes, {
    type: "error",
    position: "top-right",
    autoClose: 3000,
  });
};
</script>

<template>
  <LayoutGuest>
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
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField
          label="Email"
          help="Nhập email của bạn"
          :error="newErrors?.email"
        >
          <FormControl
            v-model="form.email"
            :icon="mdiAccount"
            name="email"
            :error="newErrors?.email ? true : false"
          />
        </FormField>

        <FormField
          label="Mật khẩu"
          help="Nhập mật khẩu của bạn"
          :error="newErrors?.password"
        >
          <FormControl
            v-model="form.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            :error="newErrors?.password ? true : false"
          />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton
              type="submit"
              color="info"
              label="Đăng nhập"
              @click="Login"
            />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
