const materialsData = [
  {
    id: 1,
    name: 'Reinforced Iron Plate',
    quantity: 90,
  },
  {
    id: 2,
    name: 'Rotor',
    quantity: 30,
  },
];

const materialData = {
  id: 1,
  name: 'Reinforced Iron Plate',
  quantity: 90,
  products: [
    {
      id: 1,
      name: 'Smart Plating',
      value: 52,
      info: {
        quantity: 2,
      },
    },
    {
      id: 2,
      name: 'Versatile Framework',
      value: 117.6,
      info: {
        quantity: 3,
      },
    },
    {
      id: 3,
      name: 'Modular Frame',
      value: 40.8,
      info: {
        quantity: 3,
      },
    },
  ],
};

export { materialsData, materialData };
