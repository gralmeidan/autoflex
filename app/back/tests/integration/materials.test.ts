import MaterialModel from '../../src/database/models/material.model';
import * as chai from 'chai';
import { app } from '../../src/app';
import { materialData, materialsData } from '../mocks/material.mocks';
import * as Sinon from 'sinon';
import * as request from 'supertest';

const { expect } = chai;

describe('Tests all routes on /materials', () => {
  beforeEach(() => {
    Sinon.stub(MaterialModel, 'findAll').resolves(materialsData as any);
    Sinon.stub(MaterialModel, 'findByPk');
    Sinon.stub(MaterialModel, 'create');
    Sinon.stub(MaterialModel, 'update');
    Sinon.stub(MaterialModel, 'destroy');
  });

  afterEach(() => {
    (MaterialModel.findAll as Sinon.SinonStub).restore();
    (MaterialModel.findByPk as Sinon.SinonStub).restore();
    (MaterialModel.create as Sinon.SinonStub).restore();
    (MaterialModel.update as Sinon.SinonStub).restore();
    (MaterialModel.destroy as Sinon.SinonStub).restore();
  });

  describe('Tests GET /', () => {
    it('Should return the expected data with a 200 status code', async () => {
      const response = await request(app).get('/materials');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(materialsData);
    });
  });

  describe('Tests GET /:id', () => {
    it('Should return the expected data with a 200 status code', async () => {
      (MaterialModel.findByPk as Sinon.SinonStub).resolves(materialData);
      const response = await request(app).get('/materials/1');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(materialData);
    });

    it('Should return a 404 status code when nothing is found', async () => {
      (MaterialModel.findByPk as Sinon.SinonStub).resolves(undefined);

      const response = await request(app).get('/materials/1');

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        message: 'Material not found!',
      });
    });
  });
  describe('Tests POST /', () => {
    it('Should return the expected data with a 201 status code', async () => {
      (MaterialModel.create as Sinon.SinonStub).resolves(materialData);
      const response = await request(app).post('/materials').send({
        name: materialData.name,
        quantity: materialData.quantity,
      });

      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal(materialData);
    });
  });

  describe('Tests PUT /:id', () => {
    it('Should return the expected data with a 200 status code', async () => {
      (MaterialModel.update as Sinon.SinonStub).resolves({ affectedCount: 1 });
      (MaterialModel.findByPk as Sinon.SinonStub).resolves({
        dataValues: materialData,
      });
      const input = {
        name: 'Complicado',
        quantity: 25,
      };

      const response = await request(app).put('/materials/1').send(input);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        ...materialData,
        ...input,
      });
    });
  });

  describe('Tests DELETE /:id', () => {
    it('Should return nothing with a 204 status code', async () => {
      (MaterialModel.destroy as Sinon.SinonStub).resolves(1);

      const response = await request(app).delete('/materials/1').send();

      expect(response.status).to.equal(204);
      expect(response.body).to.deep.equal({});
    });
  });
});
