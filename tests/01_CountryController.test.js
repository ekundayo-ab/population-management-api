import Code from 'code';
import Lab from 'lab';
import { server, init } from '../src/index';
import { Country, State, LGA } from '../src/models';


const { expect } = Code;
const lab = Lab.script();
const { describe, it, before } = lab;

describe('Country', () => {
  before(async () => {
    await init();
    await Country.sync({ force: true });
    await State.sync({ force: true });
    await LGA.sync({ force: true });
  });

  describe('creation', () => {
    it('should return error message for bad input data', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/countries',
        payload: { name: '' }
      });

      expect(response.statusCode).to.equal(400);
      expect(response.result.message).to.equal('name is not allowed to be empty');
    });

    it('should return newly created country location for valid input data', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/countries',
        payload: { name: 'Nigeria' }
      });

      expect(response.statusCode).to.equal(201);
      expect(response.result.dataValues).to.contain('name');
      expect(response.result.dataValues).to.contain('female');
      expect(response.result.dataValues).to.contain('male');
    });

    it('should return conflict error message if country name exists', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/countries',
        payload: { name: 'Nigeria' }
      });

      expect(response.statusCode).to.equal(409);
      expect(response.result.message).to.equal('Country already exists');
    });
  });
});

exports.lab = lab;
