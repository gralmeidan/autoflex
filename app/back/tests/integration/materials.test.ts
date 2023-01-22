import MaterialModel from '../../src/database/models/material.model';
import * as chai from 'chai';
import { app } from '../../src/app';
import { materialsData } from '../mocks/material.mocks';
import * as Sinon from 'sinon';
import * as request from 'supertest';

const { expect } = chai;

describe('Tests all routes on /materials', () => {
  beforeEach(() => {
    Sinon.stub(MaterialModel, 'findAll').resolves(materialsData as any);
  });

  afterEach(() => {
    (MaterialModel.findAll as Sinon.SinonStub).restore();
  });

  describe('Tests GET /', () => {
    it('Should return the expected data with a 200 status code', async () => {
      const response = await request(app).get('/materials');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(materialsData);
    });
  });
});
