import Hapi from 'hapi';
import hapiSequelize from 'hapi-sequelizejs';
import good from 'good';
import dotenv from 'dotenv';
import relish from 'relish';
import lout from 'lout';
import inert from 'inert';
import vision from 'vision';
import path from 'path';
import hapiSanitize from 'hapi-sanitize-payload';
import routes from './routes';
import { validationErrorParser } from './util/parser';
import db from './models';

dotenv.config();

export const server = new Hapi.Server({
  port: process.env.PORT || 8000,
  routes: {
    cors: true,
    validate: { failAction: relish({ stripQuotes: true }).failAction }
  }
});

const options = {
  includes: {
    request: ['headers', 'payload'],
  },
  ops: false,
  reporters: {
    reporter: [{
      module: 'good-console',
      args: [{ log: '*', response: '*', request: '*' }],
    }, 'stdout']
  }
};

const init = async () => {
  await server.register([
    { plugin: good, options },
    { plugin: lout },
    { plugin: inert },
    { plugin: vision },
    {
      plugin: hapiSequelize,
      options: [
        {
          name: 'database',
          models: [path.join(__dirname, '/src/models/**/*.js')],
          ignoredModels: [],
          sequelize: db.sequelize,
          sync: false,
          forceSync: false
        },
      ],
    },
    { plugin: hapiSanitize, options: { enabled: true } }
  ]);

  server.ext({
    type: 'onPreResponse',
    method: (request, h) => validationErrorParser(request, h)
  });

  server.route({
    method: ['GET', 'POST'],
    path: '/{any*}',
    handler(req, h) {
      return h.response({ message: 'No such route! See docs here http://localhost:8000/docs' })
        .code(404);
    },
    options: { plugins: { lout: false } }
  });

  server.realm.modifiers.route.prefix = '/api';
  server.route(routes);

  await server.start();

  console.log(`Server running at: ${server.info.uri}`); //eslint-disable-line
};

process.on('unhandledRejection', (err) => {
  console.log(err); //eslint-disable-line
  process.exit(1);
});

init();

export default {
  server
};
