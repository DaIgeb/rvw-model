import * as fromAjv from "ajv";
import * as moment from "moment";

import { ILogger } from "../base";

export function findTimeline(
  route: IDetail,
  from: string,
  until?: string
): ITimeline | undefined {
  const fromDate = moment(from);
  const untilDate = moment(until || "2100-12-31");

  const timeline = route.timelines.find(
    tl =>
      moment(tl.from).diff(fromDate) <= 0 &&
      (tl.until === undefined || moment(tl.until).diff(untilDate) >= 0)
  );
  return timeline;
}

export interface IList {
  id: string;
  name: string;
  type: "route" | "startroute";
}

export interface IRouteFile {
  path: string;
  type: "gpx" | "kml" | "kmz" | "tcx";
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
  files?: IRouteFile[];
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
          files: {
            items: {
              properties: {
                path: { type: "string" },
                type: { type: "string", enum: ["gpx", "tcx", "kml", "kmz"] }
              },
              required: ["type", "path"],
              title: "RouteFile",
              type: "object"
            },
            type: "array"
          },
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

export const validate = (obj: any, logger?: ILogger): obj is IDetail => {
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
