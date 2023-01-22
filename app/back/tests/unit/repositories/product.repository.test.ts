import ProductModel from '../../../src/database/models/product.model';
import ProductRepository from '../../../src/repositories/product.repository';
import db from '../../../src/database/models';
import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import { productData, productsData } from '../../mocks/product.mocks';

chai.use(sinonChai);

const { expect } = chai;

describe('Unit tests for ProductRepository', () => {
  beforeEach(() => {
    Sinon.stub(db, 'query').resolves(productsData as any);
    Sinon.stub(ProductModel, 'findByPk').resolves(productData as any);
  });

  afterEach(() => {
    (db.query as Sinon.SinonStub).restore();
    (ProductModel.findByPk as Sinon.SinonStub).restore();
  });

  const repository = new ProductRepository();

  describe('Tests ProductRepository.findAll', () => {
    it('Should return the filtered result when receiving no params', async () => {
      const response = await repository.findAll();

      const [[query]] = (db.query as Sinon.SinonStub).args;

      expect(response).to.deep.equal(productsData);
      expect(db.query).to.have.been.calledOnce;
      expect(query).to.include('WHERE');
    });

    it("Should return the unfiltered result when receiving 'includeUncraftable'", async () => {
      const response = await repository.findAll({ includeUncraftable: true });

      const [[query]] = (db.query as Sinon.SinonStub).args;

      expect(response).to.deep.equal(productsData);
      expect(db.query).to.have.been.calledOnce;
      expect(query).not.to.include('WHERE');
    });
  });

  describe('Tests ProductRepository.findById', () => {
    it('Should return the expected result', async () => {
      const response = await repository.findById('1');

      expect(response).to.deep.equal(productData);
      expect(ProductModel.findByPk).to.have.been.calledWith('1');
    });
  });
});
