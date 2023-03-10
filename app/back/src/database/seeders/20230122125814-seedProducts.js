'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Smart Plating',
        value: 52,
      },
      {
        name: 'Versatile Framework',
        value: 117.6,
      },
      {
        name: 'Modular Frame',
        value: 40.8,
      },
      {
        name: 'Automated Wiring',
        value: 144,
      },
      {
        name: 'Motor',
        value: 152,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
