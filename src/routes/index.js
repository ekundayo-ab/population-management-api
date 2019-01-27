import { CountryController, StateController, LGAController } from '../controllers';
import { validateCountry, validateState, validateLGA, validateUpdateLGA } from '../util/validation';

const {
  getAllCountries,
  addCountry,
  updateCountry,
  deleteCountry
} = CountryController;

const {
  getAllStates,
  addState,
  deleteState,
  updateState
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
      description: 'Get all countries with associated states and LGAs population data',
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
      description: 'Add a new country location',
    }
  },
  {
    path: '/countries/{id}',
    method: 'PATCH',
    options: {
      handler: updateCountry,
      validate: {
        payload: validateCountry
      },
      description: 'Update a country location',
    }
  },
  {
    path: '/countries/{id}',
    method: 'DELETE',
    options: {
      handler: deleteCountry,
      description: 'Delete a country and associated states and LGAs',
    }
  },
  {
    path: '/states',
    method: 'GET',
    options: {
      handler: getAllStates,
      description: 'Get all states with associated LGAs population data',
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
      description: 'Create a new state location associated with a country',
    }
  },
  {
    path: '/states/{id}',
    method: 'PATCH',
    options: {
      handler: updateState,
      validate: {
        payload: validateState
      },
      description: 'Update a state\'s name only',
    }
  },
  {
    path: '/states/{id}',
    method: 'DELETE',
    options: {
      handler: deleteState,
      description: 'Delete a state and associated LGAs',
    }
  },
  {
    path: '/lgas',
    method: 'GET',
    options: {
      handler: getAllLGAs,
      description: 'List all LGA locations with their population data including their states and country'
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
      description: 'Create a new LGA location with population data',
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
      description: 'Update an LGA location\'s population data',
    }
  },
  {
    path: '/lgas/{id}',
    method: 'DELETE',
    options: {
      handler: deleteLGA,
      description: 'Delete an LGA location\'s with their population data',
    }
  },
];

export default routes;
