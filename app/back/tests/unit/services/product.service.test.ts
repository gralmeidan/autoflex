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
  });

  afterEach(() => {
    (ProductRepository.prototype.findAll as Sinon.SinonStub).restore();
    (ProductRepository.prototype.findById as Sinon.SinonStub).restore();
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
});
