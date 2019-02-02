# Population Management API

An API that models a population management system with use cases for a countries, states and local government areas locations.

### Requirements
- PostgreSQL
- NodeJS and NPM

### Installation
- Clone this repository `git clone`
- Rename `.env.sample` file to `.env` and include the postgres database credentials for your machine.
- `cd` into project directory on the terminal `cd sms-management-api`
- Install dependencies `npm install`

### Running the API
- Run project `npm run start-dev`
- To build for production do `npm run build`

### Tests
Ensure the test database config is added to your env file and create
the test database by runnning `npm run db-create-test` in the project directory
on the terminal.
- To run tests do `npm test` or `npm run test`

### API Endpoints
LGA - signifies **Local Government Area**

#### Countries
Request type  | Endpoint                                    | Action
--------------|---------------------------------------------|--------------------------------------------------
GET           | /api/countries                              | Get all countries with associated states and LGAs population data
POST          | /api/countries                              | Add a new country location
PATCH         | /api/countries/id                           | Update a country's name only
DELETE        | /api/countries                              | Delete a country and associated states and LGAs

#### States
Request type  | Endpoint                                    | Action
--------------|---------------------------------------------|--------------------------------------------------
GET           | /api/states                                 | Get all states with associated LGAs population data
POST          | /api/countries/id/states                    | Create a new state location associated with a country
PATCH         | /api/states/id                              | Update a state's name only
DELETE        | /api/states/id                              | Delete a state and associated LGAs

#### LGAs
Request type  | Endpoint                                    | Action
--------------|---------------------------------------------|--------------------------------------------------
GET           | /api/lgas                                   | List all LGA locations with their population data including their states and country
POST          | /api/states/id/lgas                         | Create a new LGA location with population data
PATCH         | /api/lgas/id                                | Update an LGA location's population data
DELETE        | /api/lgas/id                                | Delete an LGA location's with their population data
