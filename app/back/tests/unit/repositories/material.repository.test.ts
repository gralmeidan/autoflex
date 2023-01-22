import MaterialModel from '../../../src/database/models/material.model';
import MaterialRepository from '../../../src/repositories/material.repository';
import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import { materialData, materialsData } from '../../mocks/material.mocks';

chai.use(sinonChai);

const { expect } = chai;

describe('Unit tests for MaterialRepository', () => {
  before(() => {
    Sinon.stub(MaterialModel, 'findAll').resolves(materialsData as any);
    Sinon.stub(MaterialModel, 'findByPk').resolves(materialData as any);
  });

  after(() => {
    (MaterialModel.findAll as Sinon.SinonStub).restore();
    (MaterialModel.findByPk as Sinon.SinonStub).restore();
  });

  const repository = new MaterialRepository();

  describe('Tests MaterialRepository.findAll', () => {
    it('Should return the expected result', async () => {
      const response = await repository.findAll();

      expect(response).to.deep.equal(materialsData);
      expect(MaterialModel.findAll).to.have.been.calledOnce;
    });
  });

  describe('Tests MaterialRepository.findById', () => {
    it('Should return the expected result', async () => {
      const response = await repository.findById('1');

      expect(response).to.deep.equal(materialData);
      expect(MaterialModel.findByPk).to.have.been.calledWith('1');
    });
  });
});
