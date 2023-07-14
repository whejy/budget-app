const isNumber = (number) => {
  return typeof number === 'number' || number instanceof Number;
};

const isString = (text) => {
  return typeof text === 'string' || text instanceof String;
};

export const isEmpty = (obj) => {
  for (const prop in obj) {
    if (prop) {
      return false;
    }
  }
  return true;
};

export const parseNumber = (number) => {
  const parsedNumber = parseFloat(number);
  if (!parsedNumber || !isNumber(parsedNumber)) {
    throw new Error('Incorrect or missing number');
  }
  return Math.round(100 * parsedNumber) / 100;
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

export const roundCurrency = (input) => Math.round(100 * input) / 100;

export const roundPercentage = (amount, total) =>
  Math.round((1000 * amount) / total) / 10;
