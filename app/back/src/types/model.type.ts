import { Model } from 'sequelize';

type ModelType = Pick<typeof Model, keyof typeof Model> & (new () => Model);

export default ModelType;
