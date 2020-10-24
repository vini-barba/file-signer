import 'dotenv/config';

import bodyParser from 'body-parser';
import cors from 'cors';

import App from './app';
import routes from './routes';

const PORT = Number(process.env.PORT) || 3333;

const middlewares = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  cors(),
];

const app = App({ port: PORT, routes, middlewares });

app.listen(`App listening on ${PORT}`);
