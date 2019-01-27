const addTotalField = (payload) => {
  const { male, female } = payload.dataValues;

  const response = payload;
  response.dataValues.total = male + female;

  return response;
};

export {
  addTotalField
};
