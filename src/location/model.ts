export const names = {
  plural: 'locations',
  singular: 'location'
};

export interface IBusinessHour {
  from: string;
  until: string;
  weekday:
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';
}

export interface ITimeline {
  from: string;
  until?: string;
  notes?: string;
  phone?: string;
  businessHours: IBusinessHour[];
}

export interface IPosition {
  type: 'position';
}
export interface IRestaurant {
  type: 'restaurant';
  timelines: ITimeline[];
}

export interface IList {
  id: string;
  name: string;
  identifier: string;
  street?: number;
  country?: string;
  address?: string;
  zipCode?: string;
  city?: string;
  longitude: number;
  latitude: number;
  type: 'restaurant' | 'position';
}

export type Detail = IList & (IRestaurant | IPosition);

/* tslint:disable */
export const schema = {
  additionalProperties: false,
  properties: {
    city: { type: 'string' },
    country: { type: 'string' },
    id: { type: 'string', format: 'uuid' },
    identifier: { type: 'string' },
    latitude: { type: 'number' },
    longitude: { type: 'number' },
    name: { type: 'string' },
    street: { type: 'string' },
    timelines: {
      items: {
        additionalProperties: false,
        properties: {
          businessHours: {
            items: {
              additionalProperties: false
              ,
              properties: {
                from: { type: 'string', format: 'time' },
                until: { type: 'string', format: 'time' },
                weekday: {
                  enum: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday'
                  ],
                  type: 'string',
                  
                }
              },
              required: ['weekday', 'from'],
              title: 'BusinessHours',
              type: 'object',
            },
            type: 'array',

          },
          from: { type: 'string', format: 'date' },
          notes: { type: 'string' },
          phone: { type: 'string' },

          until: { type: 'string', format: 'date' },

        },
        required: ['businessHours', 'from'],
        title: 'Timelines',
        type: 'object',
      },
      minItems: 1,
      type: 'array',
    },
    type: { type: 'string', enum: ['position', 'restaurant'] },
    zipCode: { type: 'string' },

  },
  if: {
    properties: {
      type: { enum: ['position'] }
    }
  },
  then: {
    required: ['name', 'longitude', 'latitude']
  },
  else: {
    required: ['name', 'longitude', 'latitude', 'timelines']
  }
};
/* tslint:enable */