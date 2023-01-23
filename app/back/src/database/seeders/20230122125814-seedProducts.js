'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Smart Plating',
        value: 52,
        thumb: 'http://localhost:3001/public/Smart_Plating.webp',
      },
      {
        name: 'Versatile Framework',
        value: 117.6,
        thumb: 'http://localhost:3001/public/Versatile_Framework.webp',
      },
      {
        name: 'Modular Frame',
        value: 40.8,
        thumb: 'http://localhost:3001/public/Modular_Frame.webp',
      },
      {
        name: 'Automated Wiring',
        value: 144,
        thumb: 'http://localhost:3001/public/Automated_Wiring.webp',
      },
      {
        name: 'Motor',
        value: 152,
        thumb: 'http://localhost:3001/public/Motor.webp',
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
