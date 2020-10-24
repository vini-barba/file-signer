import * as express from 'express';
import { Application, Router } from 'express';
import path from 'path';

interface appConfig {
  port: number;
  routes: Router;
  middlewares: any;
}

function App({ port, routes, middlewares }: appConfig) {
  const app: Application = express.default();

  function registerMiddlewares() {
    middlewares.forEach((middleware: any) => {
      app.use(middleware);
    });
    app.use('/files', express.static(path.join(__dirname, '..', 'files')));
  }

  function registerRoutes() {
    app.use(routes);
  }

  registerMiddlewares();
  registerRoutes();

  function listen(message: string) {
    app.listen(port, () => {
      console.log(message);
    });
  }

  return { listen };
}
export default App;
