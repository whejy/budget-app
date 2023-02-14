/* eslint-disable no-unused-vars */
const isNumber = (number) => {
  return typeof number === 'number' || number instanceof Number;
};

const isString = (text) => {
  return typeof text === 'string' || text instanceof String;
};

export const parseNumber = (number) => {
  const parsedNumber = parseFloat(number);
  if (!parsedNumber || !isNumber(parsedNumber)) {
    throw new Error('Incorrect or missing number');
  }
  return parsedNumber;
};
