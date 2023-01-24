import MaterialService from '../../../src/services/material.service';
import MaterialRepository from '../../../src/repositories/material.repository';
import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import { materialData, materialsData } from '../../mocks/material.mocks';
import RestError from '../../../src/errors/rest.error';

chai.use(sinonChai);
chai.use(chaiAsPromised);

const { expect } = chai;

describe('Unit tests for MaterialService', () => {
  beforeEach(() => {
    Sinon.stub(MaterialRepository.prototype, 'findAll').resolves(
      materialsData as any
    );
    Sinon.stub(MaterialRepository.prototype, 'findById');
    Sinon.stub(MaterialRepository.prototype, 'create').resolves(
      materialData as any
    );
    Sinon.stub(MaterialRepository.prototype, 'update').resolves({
      affectedCount: 1,
    } as any);
  });

  afterEach(() => {
    (MaterialRepository.prototype.findAll as Sinon.SinonStub).restore();
    (MaterialRepository.prototype.findById as Sinon.SinonStub).restore();
    (MaterialRepository.prototype.create as Sinon.SinonStub).restore();
    (MaterialRepository.prototype.update as Sinon.SinonStub).restore();
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
      (MaterialRepository.prototype.findById as Sinon.SinonStub).resolves(
        materialData
      );
      const response = await service.findById('1');

      expect(response).to.deep.equal(materialData);
      expect(MaterialRepository.prototype.findById).to.have.been.calledWith(
        '1'
      );
    });

    it('Should throw an error if the request material is not found', async () => {
      (MaterialRepository.prototype.findAll as Sinon.SinonStub).resolves(
        undefined
      );
      const request = service.findById('1');

      const err = await expect(request).to.be.rejectedWith(RestError);

      expect(err.status).to.equal(404);
      expect(err.message).to.equal('Material not found!');
    });
  });

  describe('Tests MaterialService.create', () => {
    it('Should return the expected result', async () => {
      const { name, quantity } = materialData;
      const response = await service.create({ name, quantity });

      expect(response).to.deep.equal(materialData);
      expect(MaterialRepository.prototype.create).to.have.been.calledWith({
        name,
        quantity,
      });
    });

    it('Should throw an error when passing an invalid object', async () => {
      const INVALID_OBJECTS = [
        {},
        { name: 'lorem ipsum', quantity: 'dolor' },
        { name: 'lorem ipsum', quantity: -3 },
        { name: 'ipsum' },
        { quantity: 55.5 },
      ] as any[];

      await Promise.all(
        INVALID_OBJECTS.map(async input => {
          const err = await expect(service.create(input)).to.be.rejectedWith(
            RestError
          );

          expect(err.status).to.equal(422);
        })
      );
    });
  });

  describe('Tests MaterialService.update', () => {
    it('Should return the expected result', async () => {
      (MaterialRepository.prototype.findById as Sinon.SinonStub).resolves({
        dataValues: materialData,
      });
      const { name, quantity } = materialData;
      const response = await service.update('1', { name, quantity });

      expect(response).to.deep.equal(materialData);
      expect(MaterialRepository.prototype.update).to.have.been.calledWith('1', {
        name,
        quantity,
      });
    });

    it('Should throw an error if the material is not found', async () => {
      (MaterialRepository.prototype.findById as Sinon.SinonStub).resolves(
        undefined
      );
      const { name, quantity } = materialData;

      const err = await expect(
        service.update('1', { name, quantity })
      ).to.be.rejectedWith(RestError);

      expect(err.status).to.equal(404);
      expect(err.message).to.equal('Material not found!');
    });

    it('Should throw an error when passing an invalid object', async () => {
      (MaterialRepository.prototype.findById as Sinon.SinonStub).resolves(
        materialData
      );
      const INVALID_OBJECTS = [
        { id: 5 },
        {},
        { name: 'lorem ipsum', quantity: -3 },
      ] as any[];

      await Promise.all(
        INVALID_OBJECTS.map(async input => {
          const err = await expect(
            service.update('1', input)
          ).to.be.rejectedWith(RestError);

          expect(err.status).to.equal(422);
        })
      );
    });
  });
});
