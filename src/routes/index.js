import { CountryController, StateController, LGAController } from '../controllers';
import { validateCountry, validateState, validateLGA, validateUpdateLGA } from '../util/validation';

const {
  getAllCountries,
  addCountry,
  deleteCountry,
} = CountryController;

const {
  getAllStates,
  addState,
  deleteState
} = StateController;

const {
  getAllLGAs,
  addLGA,
  updateLGA,
  deleteLGA
} = LGAController;

const routes = [
  {
    path: '/countries',
    method: 'GET',
    options: {
      handler: getAllCountries,
      description: 'Get all countries with their respective states population data',
    }
  },
  {
    path: '/countries',
    method: 'POST',
    options: {
      handler: addCountry,
      validate: {
        payload: validateCountry
      },
      description: 'Add a country location',
    }
  },
  {
    path: '/countries/{id}',
    method: 'DELETE',
    options: {
      handler: deleteCountry,
      description: 'Delete a country population data',
    }
  },
  {
    path: '/states',
    method: 'GET',
    options: {
      handler: getAllStates,
      description: 'Get all states',
      notes: 'Returns all states in the database with their respective LGAs'
    }
  },
  {
    path: '/countries/{id}/states',
    method: 'POST',
    options: {
      handler: addState,
      validate: {
        payload: validateState
      },
      description: 'Add a states location',
    }
  },
  {
    path: '/states/{id}',
    method: 'DELETE',
    options: {
      handler: deleteState,
      description: 'Delete a state population data',
    }
  },
  {
    path: '/lgas',
    method: 'GET',
    options: {
      handler: getAllLGAs,
      description: 'Get all LGAs',
      notes: 'Returns all LGAs in the database with their associated states'
    }
  },
  {
    path: '/states/{id}/lgas',
    method: 'POST',
    options: {
      handler: addLGA,
      validate: {
        payload: validateLGA
      },
      description: 'Add an LGA to a state with its population data',
    }
  },
  {
    path: '/lgas/{id}',
    method: 'PATCH',
    options: {
      handler: updateLGA,
      validate: {
        payload: validateUpdateLGA
      },
      description: 'Update an LGA of a state with its population data',
    }
  },
  {
    path: '/lgas/{id}',
    method: 'DELETE',
    options: {
      handler: deleteLGA,
      description: 'Delete a state population data',
    }
  },
];

export default routes;
