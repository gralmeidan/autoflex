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
    Sinon.stub(ProductModel, 'create');
    Sinon.stub(ProductModel, 'update');
    Sinon.stub(ProductModel, 'destroy');
  });

  afterEach(() => {
    (db.query as Sinon.SinonStub).restore();
    (ProductModel.findByPk as Sinon.SinonStub).restore();
    (ProductModel.create as Sinon.SinonStub).restore();
    (ProductModel.update as Sinon.SinonStub).restore();
    (ProductModel.destroy as Sinon.SinonStub).restore();
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

  describe('Tests POST /', () => {
    it('Should return the expected data with a 201 status code', async () => {
      (ProductModel.create as Sinon.SinonStub).resolves(productData);
      const response = await request(app).post('/products').send({
        name: productData.name,
        value: productData.value,
      });

      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal(productData);
    });
  });

  describe('Tests PUT /:id', () => {
    it('Should return the expected data with a 200 status code', async () => {
      (ProductModel.update as Sinon.SinonStub).resolves({ affectedCount: 1 });
      (ProductModel.findByPk as Sinon.SinonStub).resolves({
        dataValues: productData,
      });
      const input = {
        name: 'Complicado',
        value: 25,
      };

      const response = await request(app).put('/products/1').send(input);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        ...productData,
        ...input,
      });
    });
  });

  describe('Tests DELETE /:id', () => {
    it('Should return nothing with a 204 status code', async () => {
      (ProductModel.destroy as Sinon.SinonStub).resolves(1);

      const response = await request(app).delete('/products/1').send();

      expect(response.status).to.equal(204);
      expect(response.body).to.deep.equal({});
    });
  });
});
