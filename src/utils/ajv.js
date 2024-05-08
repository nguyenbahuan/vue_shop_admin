import Ajv from "ajv";
import ajvErrors from "ajv-errors";
import ajvKeywords from "ajv-keywords";
import * as ajvFormat from "ajv-formats";

const $ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  $data: true,
});
$ajv.addKeyword("notEmpty", {
  type: "string",
  validate: function (schema, data) {
    if (schema) {
      if (typeof data === "string" && data.trim().length > 0) {
        return true;
      }
      return false;
    } else return false;
  },
});
// enhance the ajv instance
ajvErrors($ajv);
ajvKeywords($ajv);
ajvFormat($ajv);

export default $ajv;
