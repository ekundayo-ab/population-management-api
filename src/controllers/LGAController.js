import Boom from 'boom';
import models from '../models';
import { addTotalField } from '../util/dbHelpers';

const { Country, State, LGA, sequelize } = models;

export default class LGAController {
  static async getAllLGAs() {
    const states = await LGA.findAll({
      include: [{ model: State, as: 'state', required: false }],
      order: [['id', 'ASC']],
    });
    return states;
  }

  static async addLGA(req, h) {
    const { name, male, female } = req.payload;

    try {
      const lgaState = await State.findOne({ where: { id: req.params.id }});
      if (!lgaState) {
        return Boom.notFound('State does not exist');
      }

      const lga = await LGA.findOrCreate({
        where: { name: name.toLowerCase(), stateId: req.params.id },
        defaults: {
          name: name.toLowerCase(),
          stateId: req.params.id,
          male,
          female
        }
      });

      if (!lga[1]) return Boom.conflict('LGA already created');

      const state = await LGAController.updateParentLocation(LGA, State, lga[0].stateId, 'stateId');
      const country = await LGAController.updateParentLocation(State, Country, state.countryId, 'countryId');

      return h.response({
        lga: addTotalField(lga[0]),
        updatedStateData: state,
        updatedCountryData: country
      }).code(201);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return Boom.conflict('LGA already exists');
      }
      throw Boom.internal(error);
    }
  }

  static async updateLGA(req) {
    const { name, male, female } = req.payload;

    try {
      const lga = await LGA.findOne({ where: { id: req.params.id }});
      if (!lga) {
        return Boom.notFound('LGA does not exist');
      }

      const updatedLga = await LGA.update({
        name: name.toLowerCase(),
        male,
        female
      }, {
        where: { id: req.params.id },
        returning: true,
        plain: true
      });

      const state = await LGAController.updateParentLocation(LGA, State, lga.stateId, 'stateId');
      const country = await LGAController.updateParentLocation(State, Country, state.countryId, 'countryId');

      return {
        lga: addTotalField(updatedLga[1]),
        updatedStateData: state,
        updatedCountryData: country
      };
    } catch (error) {
      throw Boom.internal(error);
    }
  }

  static async updateParentLocation(Child, Parent, parentId, name) {
    const parentData = (await Child.findAll({
      where: { [name]: parentId },
      attributes: [
        [sequelize.fn('sum', sequelize.col('male')), 'male'],
        [sequelize.fn('sum', sequelize.col('female')), 'female'],
      ],
    }))[0];

    const parent = (await Parent.update({
      female: parentData.female,
      male: parentData.male
    }, {
      where: { id: parentId },
      returning: true,
      plain: true
    }))[1];

    return addTotalField(parent);
  }

  static async deleteLGA(req) {
    try {
      await LGA.destroy({ where: { id: req.params.id } });
      return 'State successfully deleted.';
    } catch (error) {
      throw Boom.internal(error);
    }
  }
}
