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

export const parseString = (text) => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing string');
  }
  return text.trim();
};

export const parseDates = (dates) => {
  const startDate = new Date(dates.startDate);
  const endDate = new Date(dates.endDate);
  const parsedDates = {
    startDate: startDate.toDateString(),
    endDate: endDate.toDateString(),
  };
  return parsedDates;
};
