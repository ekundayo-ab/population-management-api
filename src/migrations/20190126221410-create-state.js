'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('States', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      male: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      female: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      countryId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Countries',
          key: 'id',
          as: 'country',
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      return queryInterface.addConstraint('States', ['name', 'countryId'], {
        type: 'unique',
        name: 'state_unique_constraint_name'
      });
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('States');
  }
};
