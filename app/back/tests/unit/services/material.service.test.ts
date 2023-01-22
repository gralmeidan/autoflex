import MaterialService from '../../../src/services/material.service';
import MaterialRepository from '../../../src/repositories/material.repository';
import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import { materialData, materialsData } from '../../mocks/material.mocks';

chai.use(sinonChai);

const { expect } = chai;

describe('Unit tests for MaterialService', () => {
  before(() => {
    Sinon.stub(MaterialRepository.prototype, 'findAll').resolves(
      materialsData as any
    );
    Sinon.stub(MaterialRepository.prototype, 'findById').resolves(
      materialData as any
    );
  });

  after(() => {
    (MaterialRepository.prototype.findAll as Sinon.SinonStub).restore();
    (MaterialRepository.prototype.findById as Sinon.SinonStub).restore();
  });

  const service = new MaterialService();

  describe('Tests MaterialService.findAll', () => {
    it('Should return the expected result', async () => {
      const response = await service.findAll();

      expect(response).to.deep.equal(materialsData);
      expect(MaterialRepository.prototype.findAll).to.have.been.calledOnce;
    });
  });

  describe('Tests MaterialService.findById', () => {
    it('Should return the expected result', async () => {
      const response = await service.findById('1');

      expect(response).to.deep.equal(materialData);
      expect(MaterialRepository.prototype.findById).to.have.been.calledWith(
        '1'
      );
    });
  });
});
