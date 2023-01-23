import * as fs from 'fs/promises';
import * as request from 'supertest';
import { app } from '../../src/app';
import * as Sinon from 'sinon';
import { fileMock } from '../mocks/file.mock';
import { expect } from 'chai';

describe('Tests all routes on /public', () => {
  describe('Tests GET /public/:fileName', () => {
    it('Should return the requested file', async () => {
      Sinon.stub(fs, 'readFile').resolves(fileMock);

      const result = await request(app).get('/public/Motor.webp');

      expect(result.status).to.equal(200);
      expect(result.body).to.deep.equal(fileMock);
      (fs.readFile as Sinon.SinonStub).restore();
    });

    it('Should throw an error when the file is not found', async () => {
      const result = await request(app).get('/public/skol-lata');

      expect(result.status).to.equal(404);
      expect(result.body).to.deep.equal({
        message: 'File not found',
      });
    });
  });
});
