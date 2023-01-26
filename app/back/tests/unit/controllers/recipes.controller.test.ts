import RecipeController from '../../../src/controllers/recipe.controller';
import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import mockExpressParams from '../../utils/mockExpressParams';
import { mockRecipeEntry } from '../../mocks/recipe.mock';

chai.use(sinonChai);

const { expect } = chai;

describe('Unit tests for RecipeController', () => {
  const service = {
    appendToRecipe: Sinon.stub().resolves(mockRecipeEntry),
    updateRecipe: Sinon.stub().resolves(mockRecipeEntry),
  };

  const controller = new RecipeController(service as any);

  describe('Tests RecipeController.appendToRecipe', () => {
    it('Should return the expected result', async () => {
      const { req, res } = mockExpressParams();
      await controller.appendToRecipe(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(mockRecipeEntry);
    });
  });

  describe('Tests RecipeController.updateRecipe', () => {
    it('Should return the expected result', async () => {
      const { req, res } = mockExpressParams();
      await controller.updateRecipe(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockRecipeEntry);
    });
  });
});
