import { ref } from "vue";
import ajv from "@/utils/ajv";

export default function useValidate() {
  const errors = ref({});
  const newErrors = ref({});
  const validate = (schema, data) => {
    const validateFn = ajv.compile(schema);
    const isValid = validateFn(data);
    if (!isValid) {
      errors.value = {};
      errors.value = validateFn.errors.map((error) => {
        return {
          [error.instancePath.slice(1)]: error.message,
        };
      });
      newErrors.value = {};
      newErrors.value = errors.value.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
          acc[key] = obj[key];
        });
        return acc;
      }, {});
      return !errors.value;
    } else {
      errors.value = {};
      newErrors.value = {};
      return true;
    }
  };

  return {
    newErrors,
    errors,
    // methods
    validate,
  };
}
