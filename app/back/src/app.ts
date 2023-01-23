import 'express-async-errors';
import * as express from 'express';
import morgan = require('morgan');
import { MaterialRouter } from './routes/material.routes';
import handleError from './middlewares/handleError.middleware';
import { ProductRouter } from './routes/product.routes';
import { FileRouter } from './routes/file.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.app.use('/materials', MaterialRouter);
    this.app.use('/products', ProductRouter);
    this.app.use('/public', FileRouter);
    this.app.use(handleError);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH'
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(morgan('dev'));
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
