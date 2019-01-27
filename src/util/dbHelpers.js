const addTotalField = (payload, fieldName) => {
  const { male, female } = payload.dataValues;

  const response = payload;
  response.dataValues[fieldName] = male + female;

  return response;
};

export {
  addTotalField
};
