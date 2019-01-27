import Boom from 'boom';
import models from '../models';

const { Country, State, LGA } = models;

export default class StateController {
  static async getAllStates() {
    const states = await State.findAll({
      include: [{ model: LGA, as: 'lgas', required: false }],
      order: [['id', 'ASC']],
    });
    return states;
  }

  static async addState(req, h) {
    const { name } = req.payload;

    const country = await Country.findOne({
      where: { id: req.params.id }
    });
    if (!country) {
      return Boom.notFound('Country does not exist');
    }

    try {
      const contact = await State.create({
        name: name.toLowerCase(),
        countryId: req.params.id
      });

      return h.response(contact).code(201);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return Boom.conflict('State already exists');
      }

      throw Boom.internal(error);
    }
  }

  static async deleteState(req) {
    try {
      await State.destroy({ where: { id: req.params.id } });
      return 'State successfully deleted.';
    } catch (error) {
      throw Boom.internal(error);
    }
  }
}
