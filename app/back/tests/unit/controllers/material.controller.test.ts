import MaterialService from '../../../src/services/material.service';
import MaterialController from '../../../src/controllers/material.controller';
import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import { materialsData } from '../../mocks/material.mocks';
import mockExpressParams from '../../utils/mockExpressParams';

chai.use(sinonChai);

const { expect } = chai;

describe('Unit tests for MaterialController', () => {
  const service = {
    findAll: Sinon.stub().resolves(materialsData),
  };

  const controller = new MaterialController(service as any);

  describe('Tests MaterialRepository.findAll', () => {
    it('Should return the expected result', async () => {
      const { req, res } = mockExpressParams();
      await controller.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(materialsData);
    });
  });
});
