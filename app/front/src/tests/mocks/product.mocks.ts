const productsData = [
  { id: 5, name: 'Motor', value: 152, craftable: 15, subtotal: 2280 },
  {
    id: 2,
    name: 'Versatile Framework',
    value: 117.6,
    craftable: 17,
    subtotal: 1999.2,
  },
  {
    id: 1,
    name: 'Smart Plating',
    value: 52,
    craftable: 16,
    subtotal: 832,
  },
  {
    id: 3,
    name: 'Modular Frame',
    value: 40.8,
    craftable: 10,
    subtotal: 408,
  },
];

const productData = {
  id: 1,
  name: 'Smart Plating',
  value: 52,
  materials: [
    {
      id: 1,
      name: 'Reinforced Iron Plate',
      quantity: 90,
      info: {
        quantity: 1,
      },
    },
    {
      id: 2,
      name: 'Rotor',
      quantity: 30,
      info: {
        quantity: 2,
      },
    },
    {
      id: 3,
      name: 'Plastic',
      quantity: 50,
      info: {
        quantity: 3,
      },
    },
  ],
};

export { productsData, productData };
