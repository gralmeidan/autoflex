import ProductController from '../../../src/controllers/product.controller';
import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import { productData, productsData } from '../../mocks/product.mocks';
import mockExpressParams from '../../utils/mockExpressParams';

chai.use(sinonChai);

const { expect } = chai;

describe('Unit tests for ProductController', () => {
  const service = {
    findAll: Sinon.stub().resolves(productsData),
    findById: Sinon.stub().resolves(productData),
  };

  const controller = new ProductController(service as any);

  describe('Tests ProductController.findAll', () => {
    it('Should return the expected result', async () => {
      const { req, res } = mockExpressParams();
      await controller.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsData);
    });

    it('Should pass query filters to service', async () => {
      const query = { includeUncraftable: 'true' };
      const { req, res } = mockExpressParams({ query });
      await controller.findAll(req, res);

      expect(service.findAll).to.have.been.calledWith({
        includeUncraftable: true,
      });
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsData);
    });
  });

  describe('Tests ProductController.findById', () => {
    it('Should return the expected result', async () => {
      const { req, res } = mockExpressParams({ params: { id: '1' } });
      await controller.findById(req, res);

      expect(service.findById).to.have.been.calledWith('1');
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productData);
    });
  });
});
