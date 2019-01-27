import Boom from 'boom';
import models from '../models';

const { Country, State, LGA } = models;

export default class CountryController {
  static async getAllCountries() {
    const countries = await Country.findAll({
      include: [{ model: State, as: 'states', required: false }],
      order: [['id', 'ASC']],
    });
    return countries;
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

  static async deleteCountry(req) {
    try {
      await Country.destroy({ where: { id: req.params.id } });
      return 'Country successfully deleted.';
    } catch (error) {
      throw Boom.internal(error);
    }
  }
}
