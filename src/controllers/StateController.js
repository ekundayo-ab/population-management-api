import Boom from 'boom';
import models from '../models';
import { addTotalField } from '../util/dbHelpers';

const { Country, State, LGA } = models;

export default class StateController {
  static async getAllStates() {
    try {
      const states = await State.findAll({
        include: [{
          model: LGA,
          as: 'lgas',
          required: false,
        }],
        order: [['id', 'ASC']],
      });

      return states.map(state => addTotalField(state, 'totalStatePopulation'));
    } catch (error) {
      throw Boom.internal(error);
    }
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

  static async updateState(req) {
    const { name } = req.payload;

    const state = await State.findOne({ where: { id: req.params.id }});
    if (!state) {
      return Boom.notFound('State does not exist');
    }

    const updatedState = await State.update({
      name: name.toLowerCase()
    }, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    });

    return updatedState;
  }

  static async deleteState(req) {
    try {
      const deletionResult = await State.destroy({ where: { id: req.params.id } });
      if (!deletionResult) return Boom.notFound('No such state exists');

      return 'State successfully deleted.';
    } catch (error) {
      throw Boom.internal(error);
    }
  }
}
