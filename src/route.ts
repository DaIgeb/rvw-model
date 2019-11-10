import * as fromAjv from "ajv";
import { ILogger } from "./base";

export interface IList {
  id: string;
  name: string;
  type: "route" | "startroute";
}

export interface IDetail extends IList {
  timelines: ITimeline[];
}

export interface ITimeline {
  from: string;
  until?: string;
  difficulty?: "easy" | "medium" | "heavy";
  distance?: number;
  elevation?: number;
  startRoute?: string;
  locations: string[];
  restaurants?: string[];
}

const schema = {
  additionalProperties: false,
  properties: {
    id: { type: "string", format: "uuid" },
    name: { type: "string" },
    timelines: {
      items: {
        properties: {
          difficulty: { type: "string", enum: ["easy", "medium", "heavy"] },
          distance: { type: "number" },
          elevation: { type: "number" },
          from: { type: "string", format: "date" },
          locations: {
            items: {
              format: "uuid",
              type: "string"
            },
            type: "array"
          },
          restaurants: {
            items: {
              format: "uuid",
              type: "string"
            },
            type: "array"
          },
          startRoute: { type: "string", format: "uuid" },
          until: { type: "string", format: "date" }
        },
        required: ["from", "locations"],
        title: "Timelines",
        type: "object"
      },
      minItems: 1,
      type: "array"
    },
    type: { type: "string", enum: ["route", "startroute"] }
  },
  required: ["name", "type", "timelines"]
};

let ajv: fromAjv.Ajv;
let validator: fromAjv.ValidateFunction;

export const validate = (obj: any, logger: ILogger): obj is IDetail => {
  if (!ajv) {
    ajv = new fromAjv(); // options can be passed, e.g. {allErrors: true}
    validator = ajv.compile(schema);
  }

  const valid = validator(obj);
  if (!valid) {
    logger.error(validator.errors);

    return false;
  }

  return true;
};