export const names = {
  plural: 'locations',
  singular: 'location'
};

interface IPosition {
  type: 'position';
}
interface IRestaurant {
  type: 'restaurant';
  timelines: Array<{
    from: string;
    until?: string;
    notes?: string;
    phone?: string;
    businessHours: Array<{
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
    }>;
  }>;
}

export type Model = {
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
  user: string;
  createdAt: string;
  updatedAt: string;
} & (IRestaurant | Position);

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