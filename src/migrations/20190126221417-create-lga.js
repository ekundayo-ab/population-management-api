module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LGAs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      male: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      female: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      stateId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'States',
          key: 'id',
          as: 'state',
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
      return queryInterface.addConstraint('LGAs', ['name', 'stateId'], {
        type: 'unique',
        name: 'lga_unique_constraint_name'
      });
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('LGAs');
  }
};
