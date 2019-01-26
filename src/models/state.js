module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    name: { type: DataTypes.STRING, unique: 'compositeIndex' },
    countryId: { type: DataTypes.INTEGER, unique: 'compositeIndex' },
    male: DataTypes.INTEGER,
    female: DataTypes.INTEGER
  }, {});

  State.associate = (models) => {
    State.belongsTo(models.Country, {
      onDelete: 'CASCADE',
      as: 'state',
      foreignKey: 'countryId'
    });

    State.hasMany(models.LGA, {
      foreignKey: 'stateId',
      as: 'lgas'
    });
  };
  return State;
};
