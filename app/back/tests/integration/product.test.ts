import ProductModel from '../../src/database/models/product.model';
import db from '../../src/database/models';
import * as chai from 'chai';
import { app } from '../../src/app';
import { productData, productsData } from '../mocks/product.mocks';
import * as Sinon from 'sinon';
import * as request from 'supertest';

const { expect } = chai;

describe('Tests all routes on /products', () => {
  beforeEach(() => {
    Sinon.stub(db, 'query').resolves(productsData as any);
    Sinon.stub(ProductModel, 'findByPk');
  });

  afterEach(() => {
    (db.query as Sinon.SinonStub).restore();
    (ProductModel.findByPk as Sinon.SinonStub).restore();
  });

  describe('Tests GET /', () => {
    it('Should return the expected data with a 200 status code', async () => {
      const response = await request(app).get('/products');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(productsData);
    });
  });

  describe('Tests GET /:id', () => {
    it('Should return the expected data with a 200 status code', async () => {
      (ProductModel.findByPk as Sinon.SinonStub).resolves(productData);
      const response = await request(app).get('/products/1');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(productData);
    });

    it('Should return a 404 status code when nothing is found', async () => {
      (ProductModel.findByPk as Sinon.SinonStub).resolves(undefined);

      const response = await request(app).get('/products/1');

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        message: 'Product not found!',
      });
    });
  });
});
