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
  });

  afterEach(() => {
    (MaterialModel.findAll as Sinon.SinonStub).restore();
    (MaterialModel.findByPk as Sinon.SinonStub).restore();
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
});
