import RecipeService from '../../../src/services/recipe.service';
import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import RestError from '../../../src/errors/rest.error';
import { mockRecipeEntry } from '../../mocks/recipe.mock';
import MaterialRepository from '../../../src/repositories/material.repository';
import { materialData } from '../../mocks/material.mocks';
import ProductRepository from '../../../src/repositories/product.repository';
import { productData } from '../../mocks/product.mocks';

chai.use(sinonChai);
chai.use(chaiAsPromised);

const { expect } = chai;

describe('Unit tests for RecipeService', () => {
  const INVALID_OBJECTS = [
    {},
    { ...mockRecipeEntry, productId: -1 },
    { ...mockRecipeEntry, productId: 0 },
    { ...mockRecipeEntry, productId: 'str' },
    { ...mockRecipeEntry, productId: 2.3 },
    { ...mockRecipeEntry, productId: undefined },
    { ...mockRecipeEntry, materialId: 'str' },
    { ...mockRecipeEntry, materialId: 0 },
    { ...mockRecipeEntry, materialId: -1 },
    { ...mockRecipeEntry, materialId: 2.3 },
    { ...mockRecipeEntry, materialId: undefined },
    { ...mockRecipeEntry, quantity: -1 },
    { ...mockRecipeEntry, quantity: 0 },
    { ...mockRecipeEntry, quantity: 'str' },
    { ...mockRecipeEntry, quantity: 2.3 },
    { ...mockRecipeEntry, quantity: undefined },
  ] as any[];

  beforeEach(() => {
    Sinon.stub(MaterialRepository.prototype, 'findById').resolves(
      materialData as any
    );
    Sinon.stub(ProductRepository.prototype, 'findById').resolves(
      productData as any
    );
  });

  afterEach(() => {
    (MaterialRepository.prototype.findById as Sinon.SinonStub).restore();
    (ProductRepository.prototype.findById as Sinon.SinonStub).restore();
  });

  const repo = {
    appendToRecipe: Sinon.stub().resolves(mockRecipeEntry),
    findByIds: Sinon.stub().resolves(undefined),
    updateRecipe: Sinon.stub().resolves({ affectedCount: 1 }),
  } as any;

  const service = new RecipeService(repo);

  describe('Tests RecipeService.appendToRecipe', () => {
    it('Should return the expected result', async () => {
      const response = await service.appendToRecipe(mockRecipeEntry);

      expect(response).to.deep.equal(mockRecipeEntry);
      expect(repo.appendToRecipe).to.have.been.calledWith(mockRecipeEntry);
    });

    it('Should throw an error when passing an invalid object', async () => {
      await Promise.all(
        INVALID_OBJECTS.map(async input => {
          const err = await expect(
            service.appendToRecipe(input)
          ).to.be.rejectedWith(RestError);

          expect(err.status).to.equal(422);
        })
      );
    });

    it('Should throw an error when the material does not exist', async () => {
      (MaterialRepository.prototype.findById as Sinon.SinonStub).resolves(
        undefined
      );

      const err = await expect(
        service.appendToRecipe(mockRecipeEntry)
      ).to.be.rejectedWith(RestError);

      expect(err.status).to.equal(404);
      expect(err.message).to.equal('Material not found!');
    });

    it('Should throw an error when the product does not exist', async () => {
      (ProductRepository.prototype.findById as Sinon.SinonStub).resolves(
        undefined
      );

      const err = await expect(
        service.appendToRecipe(mockRecipeEntry)
      ).to.be.rejectedWith(RestError);

      expect(err.status).to.equal(404);
      expect(err.message).to.equal('Product not found!');
    });

    it('Should throw an error when the the entry already exists', async () => {
      repo.findByIds.resolves(mockRecipeEntry);

      const err = await expect(
        service.appendToRecipe(mockRecipeEntry)
      ).to.be.rejectedWith(RestError);

      expect(err.status).to.equal(409);
      expect(err.message).to.equal('Entry already exists!');
    });
  });
  describe('Tests RecipeService.updateRecipe', () => {
    it('Should return the expected result', async () => {
      const response = await service.updateRecipe(mockRecipeEntry);

      expect(response).to.deep.equal(mockRecipeEntry);
      expect(repo.updateRecipe).to.have.been.calledWith(mockRecipeEntry);
    });

    it('Should throw an error when passing an invalid object', async () => {
      await Promise.all(
        INVALID_OBJECTS.map(async input => {
          const err = await expect(
            service.updateRecipe(input)
          ).to.be.rejectedWith(RestError);

          expect(err.status).to.equal(422);
        })
      );
    });

    it('Should throw an error when the entry does not exist', async () => {
      repo.findByIds.resolves(undefined);

      const err = await expect(
        service.updateRecipe(mockRecipeEntry)
      ).to.be.rejectedWith(RestError);

      expect(err.status).to.equal(404);
      expect(err.message).to.equal('Entry not found!');
    });
  });
});
