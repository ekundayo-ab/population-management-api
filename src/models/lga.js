module.exports = (sequelize, DataTypes) => {
  const LGA = sequelize.define('LGA', {
    name: { type: DataTypes.STRING, unique: 'compositeIndex' },
    stateId: { type: DataTypes.INTEGER, unique: 'compositeIndex' },
    male: DataTypes.INTEGER,
    female: DataTypes.INTEGER
  }, {});

  LGA.associate = (models) => {
    LGA.belongsTo(models.State, {
      onDelete: 'CASCADE',
      as: 'state',
      foreignKey: 'stateId'
    });
  };
  return LGA;
};
