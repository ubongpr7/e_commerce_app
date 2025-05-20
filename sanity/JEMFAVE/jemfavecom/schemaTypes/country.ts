// schemas/country.ts
export default {
  name: 'country',
  type: 'document',
  title: 'Country',
  fields: [
    { name: 'name', type: 'string', title: 'Country Name' },
    { name: 'code', type: 'string', title: 'Country Code (e.g. NG)' },
    { name: 'dial_code', type: 'string', title: 'Dial Code (e.g. +234)' },
    { name: 'flag', type: 'string', title: 'Flag Emoji' },
  ],
};
