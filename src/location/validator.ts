import * as fromAjv from "ajv";

import { ILogger } from "../base";
import { Detail, schema } from "./model";

let ajv: fromAjv.Ajv;
let validator: fromAjv.ValidateFunction;

export const validate = (obj: any, logger?: ILogger): obj is Detail => {
  if (!obj || typeof obj !== "object") {
    if (logger) {
      logger.error("Not an object");
    }
    return false;
  }
  if (!ajv) {
    ajv = new fromAjv(); // options can be passed, e.g. {allErrors: true}
    validator = ajv.compile(schema);
  }

  const valid = validator(obj);

  if (!valid) {
    if (logger) {
      logger.error(validator.errors);
    }

    return false;
  }

  return true;
};
