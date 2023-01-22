'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('materials_products', [
      {
        material_id: 1,
        product_id: 1,
        quantity: 2,
      },
      {
        material_id: 2,
        product_id: 1,
        quantity: 1,
      },
      {
        material_id: 3,
        product_id: 1,
        quantity: 3,
      },
      {
        material_id: 1,
        product_id: 2,
        quantity: 3,
      },
      {
        material_id: 6,
        product_id: 2,
        quantity: 6,
      },
      {
        material_id: 4,
        product_id: 2,
        quantity: 14,
      },
      {
        material_id: 1,
        product_id: 3,
        quantity: 3,
      },
      {
        material_id: 6,
        product_id: 3,
        quantity: 12,
      },
      {
        material_id: 5,
        product_id: 4,
        quantity: 2,
      },
      {
        material_id: 7,
        product_id: 4,
        quantity: 20,
      },
      {
        material_id: 2,
        product_id: 5,
        quantity: 2,
      },
      {
        material_id: 5,
        product_id: 5,
        quantity: 2,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('materials_products', null, {});
  },
};
