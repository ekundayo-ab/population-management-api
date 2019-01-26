module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    name: { type: DataTypes.STRING, unique: true },
    male: DataTypes.INTEGER,
    female: DataTypes.INTEGER
  }, {});

  Country.associate = (models) => {
    Country.hasMany(models.State, {
      foreignKey: 'countryId',
      as: 'states'
    });
  };
  return Country;
};
