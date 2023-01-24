'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('materials', [
      {
        name: 'Reinforced Iron Plate',
        quantity: 90,
      },
      {
        name: 'Rotor',
        quantity: 30,
      },
      {
        name: 'Plastic',
        quantity: 50,
      },
      {
        name: 'Steel Beam',
        quantity: 240,
      },
      {
        name: 'Stator',
        quantity: 50,
      },
      {
        name: 'Iron Rod',
        quantity: 130,
      },
      {
        name: 'Cable',
        quantity: 0,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('materials', null, {});
  },
};
