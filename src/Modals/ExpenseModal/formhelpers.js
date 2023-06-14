import * as yup from 'yup';

export const getInitialValues = ({ item, selectedCategory }) => {
  return {
    item: item?.item || '',
    amount: (item && String(item.amount)) || '',
    category: selectedCategory || 'Shopping',
    date: item?.date || '',
  };
};

export const getIncomeValidationSchema = ({ item, remainingIncome }) => {
  // if item = null we are adding an income, otherwise we are editing an income
  // and must check that the edited income is not less than the total expenses
  const minIncome = item
    ? item.amount > remainingIncome
      ? item.amount - remainingIncome
      : 0
    : 0;

  const validationSchema = {
    item: yup.string().required('Description is required'),
    amount: yup
      .number()
      .typeError('Amount must be a number')
      .required('Amount is required')
      .positive()
      .moreThan(minIncome, `Amount must be more than ${minIncome}`),
  };
  return yup.object().shape(validationSchema);
};

export const getExpenseValidationSchema = ({ item, remainingIncome }) => {
  const validationSchema = {
    item: yup.string().required('Description is required'),
    amount: yup
      .number()
      .typeError('Amount must be a number')
      .required('Amount is required')
      .positive('Amount must be greater than 0')
      .max(
        remainingIncome + (item?.amount || 0),
        `Amount cannot be greater than ${remainingIncome + (item?.amount || 0)}`
      ),
    date: yup.string().required('Date is requred'),
    category: yup.string().required('Category is required'),
  };
  return yup.object().shape(validationSchema);
};

export const addIncome = ({ id, item, amount, pie }) => {
  pie.income.push({ id: id, amount: amount, item: item });
  return pie;
};

export const removeIncome = ({ incomeToRemove, pie }) => {
  const updatedIncome = pie.income.filter(
    (income) => income.id !== incomeToRemove.id
  );
  pie.income = updatedIncome;
  return pie;
};

export const addExpense = ({ id, item, amount, category, date, pie }) => {
  Object.keys(pie.expenses).includes(category)
    ? pie.expenses[category].push({ id, item, amount, date })
    : (pie.expenses[category] = [{ id, item, amount, date }]);

  return pie;
};

export const removeExpense = ({ expenseToRemove, category, pie }) => {
  const updatedCategory = pie.expenses[category].filter(
    (expense) => expense.id !== expenseToRemove.id
  );

  // If this item is the final item within the category, remove category
  updatedCategory.length > 0
    ? (pie.expenses[category] = updatedCategory)
    : delete pie.expenses[category];

  return pie;
};
