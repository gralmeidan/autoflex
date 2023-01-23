'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('materials', [
      {
        name: 'Reinforced Iron Plate',
        quantity: 90,
        thumb: 'http://localhost:3001/public/Reinforced_Iron_Plate.webp',
      },
      {
        name: 'Rotor',
        quantity: 30,
        thumb: 'http://localhost:3001/public/Rotor.webp',
      },
      {
        name: 'Plastic',
        quantity: 50,
        thumb: 'http://localhost:3001/public/Plastic.webp',
      },
      {
        name: 'Steel Beam',
        quantity: 240,
        thumb: 'http://localhost:3001/public/Steel_Beam.webp',
      },
      {
        name: 'Stator',
        quantity: 50,
        thumb: 'http://localhost:3001/public/Stator.webp',
      },
      {
        name: 'Iron Rod',
        quantity: 130,
        thumb: 'http://localhost:3001/public/Iron_Rod.webp',
      },
      {
        name: 'Cable',
        quantity: 200,
        thumb: 'http://localhost:3001/public/Cable.webp',
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('materials', null, {});
  },
};
