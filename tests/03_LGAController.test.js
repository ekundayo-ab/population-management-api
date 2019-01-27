import Code from 'code';
import Lab from 'lab';
import { server } from '../src/index';


const { expect } = Code;
const lab = Lab.script();
const { describe, it } = lab;

describe('LGA', () => {
  describe('creation', () => {
    it('should return error message for bad name input data', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/states/1/lgas',
        payload: { name: '' }
      });

      expect(response.statusCode).to.equal(400);
      expect(response.result.message).to.equal('name is not allowed to be empty');
    });

    it('should return error message for bad female data', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/states/1/lgas',
        payload: { name: 'Isolo North', male: 3000, female: '' }
      });

      expect(response.statusCode).to.equal(400);
      expect(response.result.message).to.equal('female must be a number');
    });

    it('should return error message if state does not exist', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/states/19/lgas',
        payload: { name: 'Kano', male: 2000, female: 4000 }
      });

      expect(response.statusCode).to.equal(404);
      expect(response.result.message).to.equal('State does not exist');
    });

    it('should create lga and update state and country population data', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/states/1/lgas',
        payload: { name: 'Kwaru South', male: 2000, female: 4000 }
      });

      expect(response.statusCode).to.equal(201);
      expect(response.result.lga.dataValues.name).to.equal('kwaru south');
      expect(response.result.updatedStateData.dataValues.name).to.equal('lagos');
      expect(response.result.updatedCountryData.dataValues.name).to.equal('nigeria');

      expect(response.result.updatedStateData.dataValues.male).to.equal(2000);
      expect(response.result.updatedCountryData.dataValues.male).to.equal(2000);
      expect(response.result.updatedStateData.dataValues.female).to.equal(4000);
      expect(response.result.updatedCountryData.dataValues.female).to.equal(4000);
    });

    it('should increase state and country population data with newly added lga', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/states/1/lgas',
        payload: { name: 'Baruwa', male: 3000, female: 3000 }
      });

      expect(response.statusCode).to.equal(201);
      expect(response.result.updatedStateData.dataValues.male).to.equal(5000);
      expect(response.result.updatedCountryData.dataValues.male).to.equal(5000);

      expect(response.result.updatedStateData.dataValues.female).to.equal(7000);
      expect(response.result.updatedCountryData.dataValues.female).to.equal(7000);
    });

    it('should reduce state and country population data if lga is removed', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: '/api/lgas/2',
      });

      expect(response.statusCode).to.equal(200);
      expect(response.result.message).to.equal('LGA successfully deleted.');

      expect(response.result.state.dataValues.male).to.equal(2000);
      expect(response.result.country.dataValues.male).to.equal(2000);

      expect(response.result.state.dataValues.female).to.equal(4000);
      expect(response.result.country.dataValues.female).to.equal(4000);
    });
  });
});

exports.lab = lab;
