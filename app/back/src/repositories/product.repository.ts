import ProductModel from '../database/models/product.model';
import MaterialModel from '../database/models/material.model';
import ItemRepository from './item.repository';
import db from '../database/models';
import { QueryTypes } from 'sequelize';
import IProduct from '../interfaces/product.interface';

export default class ProductRepository extends ItemRepository<IProduct> {
  constructor() {
    super(ProductModel);
  }

  public findAll({ includeUncraftable }: Record<string, boolean> = {}) {
    return db.query(
      `
      SELECT craftables.*
      FROM (
        SELECT product.*,
          IFNULL(
            FLOOR(MIN(material.quantity / info.quantity)),
            0
          ) AS 'craftable',
          IFNULL(
            ROUND(
              FLOOR(MIN(material.quantity / info.quantity)) * product.value,
              2
            ),
            0
          ) AS 'subtotal'
        FROM products as product
          LEFT JOIN materials_products AS info ON info.product_id = product.id
          LEFT JOIN materials AS material ON info.material_id = material.id
        GROUP BY product.id
      ) AS craftables
      ${!includeUncraftable ? 'WHERE craftables.craftable > 0' : ''}
      ORDER BY craftables.subtotal DESC;
      `,
      {
        type: QueryTypes.SELECT,
      }
    ) as unknown as Promise<IProduct>;
  }

  public findById(id: string) {
    return this._findById(
      id,
      this.defaultOptions({
        model: MaterialModel,
        as: 'materials',
      })
    );
  }

  public create = this._create;

  public update = this._update;
}
