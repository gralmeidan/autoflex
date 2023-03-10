import MaterialService from '../../../src/services/material.service';
import MaterialController from '../../../src/controllers/material.controller';
import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import { materialData, materialsData } from '../../mocks/material.mocks';
import mockExpressParams from '../../utils/mockExpressParams';

chai.use(sinonChai);

const { expect } = chai;

describe('Unit tests for MaterialController', () => {
  const service = {
    findAll: Sinon.stub().resolves(materialsData),
    findById: Sinon.stub().resolves(materialData),
    create: Sinon.stub().resolves(materialData),
    update: Sinon.stub().resolves(materialData),
  };

  const controller = new MaterialController(service as any);

  describe('Tests MaterialController.findAll', () => {
    it('Should return the expected result', async () => {
      const { req, res } = mockExpressParams();
      await controller.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(materialsData);
    });
  });

  describe('Tests MaterialController.findById', () => {
    it('Should return the expected result', async () => {
      const { req, res } = mockExpressParams({ params: { id: '1' } });
      await controller.findById(req, res);

      expect(service.findById).to.have.been.calledWith('1');
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(materialData);
    });
  });

  describe('Tests MaterialController.create', () => {
    it('Should return the expected result', async () => {
      const { req, res } = mockExpressParams({
        body: materialData,
      });
      await controller.create(req, res);

      expect(service.create).to.have.been.calledWith(materialData);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(materialData);
    });
  });

  describe('Tests MaterialController.update', () => {
    it('Should return the expected result', async () => {
      const { req, res } = mockExpressParams({
        params: { id: '1' },
        body: materialData,
      });
      await controller.update(req, res);

      expect(service.update).to.have.been.calledWith('1', materialData);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(materialData);
    });
  });
});
