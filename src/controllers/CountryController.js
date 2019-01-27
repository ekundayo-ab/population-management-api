import Boom from 'boom';
import models from '../models';
import { addTotalField } from '../util/dbHelpers';

const { Country, State, LGA } = models;

export default class CountryController {
  static async getAllCountries() {
    try {
      const countries = await Country.findAll({
        include: [{
          model: State,
          as: 'states',
          required: false,
          include: [
            {
              model: LGA,
              as: 'lgas',
              required: false,
            }
          ]
        }],
        order: [['id', 'ASC']],
      });

      return countries.map(country => addTotalField(country, 'totalCountryPopulation'));
    } catch (error) {
      throw Boom.internal(error);
    }
  }

  static async addCountry(req, h) {
    const { name } = req.payload;
    try {
      const contact = await Country.create({ name: name.toLowerCase().trim() });
      return h.response(contact).code(201);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return Boom.conflict('Country already exists');
      }
      throw Boom.internal(error);
    }
  }

  static async updateCountry(req) {
    const { name } = req.payload;

    const country = await Country.findOne({ where: { id: req.params.id } });
    if (!country) {
      return Boom.notFound('Country does not exist');
    }

    const updatedCountry = await Country.update({
      name: name.toLowerCase()
    }, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    });

    return updatedCountry;
  }

  static async deleteCountry(req) {
    try {
      const deletionResult = await Country.destroy({ where: { id: req.params.id } });
      if (!deletionResult) return Boom.notFound('No such country exists');

      return 'Country successfully deleted.';
    } catch (error) {
      throw Boom.internal(error);
    }
  }
}
