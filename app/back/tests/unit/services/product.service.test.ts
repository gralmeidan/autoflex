import ProductService from '../../../src/services/product.service';
import ProductRepository from '../../../src/repositories/product.repository';
import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import { productData, productsData } from '../../mocks/product.mocks';
import RestError from '../../../src/errors/rest.error';

chai.use(sinonChai);
chai.use(chaiAsPromised);

const { expect } = chai;

describe('Unit tests for ProductService', () => {
  beforeEach(() => {
    Sinon.stub(ProductRepository.prototype, 'findAll').resolves(
      productsData as any
    );
    Sinon.stub(ProductRepository.prototype, 'findById');
    Sinon.stub(ProductRepository.prototype, 'create').resolves(
      productData as any
    );
    Sinon.stub(ProductRepository.prototype, 'update').resolves({
      affectedCount: 1,
    } as any);
  });

  afterEach(() => {
    (ProductRepository.prototype.findAll as Sinon.SinonStub).restore();
    (ProductRepository.prototype.findById as Sinon.SinonStub).restore();
    (ProductRepository.prototype.create as Sinon.SinonStub).restore();
    (ProductRepository.prototype.update as Sinon.SinonStub).restore();
  });

  const service = new ProductService();

  describe('Tests ProductService.findAll', () => {
    it('Should return the expected result', async () => {
      const response = await service.findAll();

      expect(response).to.deep.equal(productsData);
      expect(ProductRepository.prototype.findAll).to.have.been.calledOnce;
    });
  });

  describe('Tests ProductService.findById', () => {
    it('Should return the expected result', async () => {
      (ProductRepository.prototype.findById as Sinon.SinonStub).resolves(
        productData
      );
      const response = await service.findById('1');

      expect(response).to.deep.equal(productData);
      expect(ProductRepository.prototype.findById).to.have.been.calledWith('1');
    });

    it('Should throw an error if the request product is not found', async () => {
      (ProductRepository.prototype.findAll as Sinon.SinonStub).resolves(
        undefined
      );
      const request = service.findById('1');

      const err = await expect(request).to.be.rejectedWith(RestError);

      expect(err.status).to.equal(404);
      expect(err.message).to.equal('Product not found!');
    });
  });

  describe('Tests ProductService.create', () => {
    it('Should return the expected result', async () => {
      const { name, value } = productData;
      const response = await service.create({ name, value });

      expect(response).to.deep.equal(productData);
      expect(ProductRepository.prototype.create).to.have.been.calledWith({
        name,
        value,
      });
    });

    it('Should throw an error when passing an invalid object', async () => {
      const INVALID_OBJECTS = [
        {},
        { name: 'lorem ipsum', value: 'dolor' },
        { name: 'lorem ipsum', value: -3 },
        { name: 'ipsum' },
        { value: 55.5 },
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

  describe('Tests ProductService.update', () => {
    it('Should return the expected result', async () => {
      (ProductRepository.prototype.findById as Sinon.SinonStub).resolves({
        dataValues: productData,
      });
      const { name, value } = productData;
      const response = await service.update('1', { name, value });

      expect(response).to.deep.equal(productData);
      expect(ProductRepository.prototype.update).to.have.been.calledWith('1', {
        name,
        value,
      });
    });

    it('Should throw an error if the product is not found', async () => {
      (ProductRepository.prototype.findById as Sinon.SinonStub).resolves(
        undefined
      );
      const { name, value } = productData;

      const err = await expect(
        service.update('1', { name, value })
      ).to.be.rejectedWith(RestError);

      expect(err.status).to.equal(404);
      expect(err.message).to.equal('Product not found!');
    });

    it('Should throw an error when passing an invalid object', async () => {
      (ProductRepository.prototype.findById as Sinon.SinonStub).resolves(
        productData
      );
      const INVALID_OBJECTS = [
        { id: 5 },
        {},
        { name: 'lorem ipsum', value: -3 },
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
