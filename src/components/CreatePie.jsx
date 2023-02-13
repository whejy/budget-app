/* eslint-disable no-unused-vars */

import FormToggle from './FormToggle';
// Form and logic for creating Pies
const CreatePie = (_newItem) => {
  //   Structure of new Pie data
  class Pie {
    constructor(date, income) {
      this.weekStart = date;
      this.weekEnd = date;
      this.income = income;
    }
  }
  // Initiate a new Pie instance. This will be called depending on date of new entry
  //   IF current date is still valid, will not call this
  const test = new Pie('12-11-1990', 1500);

  //   This is how new data will arrive
  const newItem = { item: 'handbag', cost: 500, category: 'Shopping' };
  const newItem2 = { item: 'gas', cost: 500, category: 'Bills' };

  //   Adding a category to test following IF/ELSE logic
  test.expenses = { Shopping: [{ item: 'makeup', cost: 900 }] };

  //   IF category already exists, add item to category array,
  // ELSE create category array
  const addItem = ({ item, cost, category }) => {
    Object.keys(test.expenses).includes(category)
      ? test.expenses[category].push({ item, cost })
      : (test.expenses[category] = [{ item, cost }]);
  };

  return;
};

export default CreatePie;
