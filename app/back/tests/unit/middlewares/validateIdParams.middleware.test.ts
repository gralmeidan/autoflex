import RestError from '../../../src/errors/rest.error';
import validateIdParams from '../../../src/middlewares/validateIdParams.middleware';
import mockExpressParams from '../../utils/mockExpressParams';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai);
chai.use(chaiAsPromised);

const { expect } = chai;

describe('Tests validateIdParams.middleware', () => {
  const params = {
    lorem: 'IPSUM',
    dolor: 'SIT',
    amet: '-2',
    id: '1',
    foo: '-2.3',
    bar: '0',
    valid: '3',
  };

  it('Should return a function', () => {
    const resp = validateIdParams('amet');

    expect(resp).to.be.instanceOf(Function);
  });

  it('Should throw an error if one id is invalid', async () => {
    const { req, res, next } = mockExpressParams({ params });

    const err = await expect(
      validateIdParams('amet')(req, res, next)
    ).to.be.rejectedWith(RestError);

    expect(err.status).to.equal(422);
  });

  it('Should throw an error if one id is invalid among an array of valid ids', async () => {
    const { req, res, next } = mockExpressParams({ params });

    const err = await expect(
      validateIdParams('id', 'foo', 'valid')(req, res, next)
    ).to.be.rejectedWith(RestError);

    expect(err.status).to.equal(422);
  });

  it('Should throw an error if id is undefined', async () => {
    const { req, res, next } = mockExpressParams({ params: {} });

    const err = await expect(
      validateIdParams('id')(req, res, next)
    ).to.be.rejectedWith(RestError);

    expect(err.status).to.equal(422);
  });

  it('Should call next if ids are valid', async () => {
    const { req, res, next } = mockExpressParams({ params });

    await validateIdParams('id', 'valid')(req, res, next);

    expect(next).to.have.been.called;
    expect(res.status).not.to.have.been.called;
  });
});
