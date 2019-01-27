import Code from 'code';
import Lab from 'lab';
import { server } from '../src/index';


const { expect } = Code;
const lab = Lab.script();
const { describe, it } = lab;

describe('State', () => {
  describe('creation', () => {
    it('should return error message for bad input data', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/countries/1/states',
        payload: { name: '' }
      });

      expect(response.statusCode).to.equal(400);
      expect(response.result.message).to.equal('name is not allowed to be empty');
    });

    it('should return error message if country does not exist', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/countries/19/states',
        payload: { name: 'Kano' }
      });

      expect(response.statusCode).to.equal(404);
      expect(response.result.message).to.equal('Country does not exist');
    });

    it('should return newly created state location for valid input data', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/countries/1/states',
        payload: { name: 'Lagos' }
      });

      expect(response.statusCode).to.equal(201);
      expect(response.result.dataValues).to.contain('name');
      expect(response.result.dataValues).to.contain('female');
      expect(response.result.dataValues).to.contain('male');
    });

    it('should return conflict error message if state with same country exists', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/countries/1/states',
        payload: { name: 'Lagos' }
      });

      expect(response.statusCode).to.equal(409);
      expect(response.result.message).to.equal('State already exists');
    });
  });
});

exports.lab = lab;
