export const names = {
  plural: "seasons",
  singular: "season"
};

export interface IList {
  id: string;
  year: number;
  seasonStart: string;
  seasonEnd: string;
  evneningStart: string;
  evneningEnd: string;
  events: IEvent[];
  routes: string[];
}

export interface IEvent {
  from: string;
  until: string;
  name: string;
  location: string;
  organizer: string;
}

/* tslint:disable */
export const schema = {
  additionalProperties: false,
  properties: {
    year: {
      type: "number"
    },
    seasonStart: {
      type: "string",
      format: "date"
    },
    seasonEnd: {
      type: "string",
      format: "date"
    },
    eveningStart: {
      type: "string",
      format: "date"
    },
    eveningEnd: {
      type: "string",
      format: "date"
    },
    events: {
      type: "array",
      items: {
        additionalProperties: false,
        properties: {
          from: { type: "string", format: "date" },
          until: { type: "string", format: "date" },
          name: { type: "string" },
          location: { type: "string" },
          organizer: { type: "string" }
        },
        required: ["from", "until", "location", "organizer"],
        type: "object"
      }
    },
    routes: {
      type: "array",
      items: { type: "string", format: "uuid" }
    }
  },
  required: [
    "year",
    "seasonStart",
    "seasonEnd",
    "eveningStart",
    "eveningEnd",
    "events",
    "routess"
  ]
};
/* tslint:enable */
