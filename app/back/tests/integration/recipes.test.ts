import * as request from 'supertest';
import { app } from '../../src/app';
import * as Sinon from 'sinon';
import { expect } from 'chai';
import MaterialProductModel from '../../src/database/models/materialProduct.model';
import { mockRecipeEntry } from '../mocks/recipe.mock';
import MaterialModel from '../../src/database/models/material.model';
import ProductModel from '../../src/database/models/product.model';
import { productData } from '../mocks/product.mocks';
import { materialData } from '../mocks/material.mocks';

describe('Tests all routes on /recipes', () => {
  beforeEach(() => {
    Sinon.stub(MaterialProductModel, 'create').resolves(mockRecipeEntry as any);
    Sinon.stub(MaterialProductModel, 'findOne').resolves(undefined);
    Sinon.stub(MaterialProductModel, 'update').resolves({
      affectedCount: 1,
    } as any);
    Sinon.stub(MaterialModel, 'findByPk').resolves(productData as any);
    Sinon.stub(ProductModel, 'findByPk').resolves(materialData as any);
  });

  afterEach(() => {
    (MaterialProductModel.create as Sinon.SinonStub).restore();
    (MaterialProductModel.findOne as Sinon.SinonStub).restore();
    (MaterialProductModel.update as Sinon.SinonStub).restore();
    (MaterialModel.findByPk as Sinon.SinonStub).restore();
    (ProductModel.findByPk as Sinon.SinonStub).restore();
  });

  describe('Tests POST /recipes', () => {
    it('Should return the newly created entry', async () => {
      const result = await request(app).post('/recipes').send(mockRecipeEntry);

      expect(result.status).to.equal(201);
      expect(result.body).to.deep.equal(mockRecipeEntry);
    });
  });

  describe('Tests PUT /recipes', () => {
    it('Should return the newly updated entry', async () => {
      (MaterialProductModel.findOne as Sinon.SinonStub).resolves(
        mockRecipeEntry
      );
      const result = await request(app)
        .put('/recipes')
        .send({
          ...mockRecipeEntry,
          quantity: 20,
        });

      expect(result.status).to.equal(200);
      expect(result.body).to.deep.equal({
        ...mockRecipeEntry,
        quantity: 20,
      });
    });
  });
});
