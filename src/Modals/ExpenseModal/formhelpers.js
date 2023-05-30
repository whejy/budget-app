import * as yup from 'yup';

export const getIncomeInitialValues = () => {
  return { item: '', income: '', category: 'Income' };
};

export const getExpenseInitialValues = ({ item, formCategory }) => {
  return {
    item: item?.item || '',
    cost: (item && String(item.cost)) || '',
    category: formCategory || 'Shopping',
  };
};

export const getIncomeValidationSchema = () => {
  const validationSchema = {
    item: yup.string().required('Source is required'),
    income: yup
      .number()
      .typeError('Income must be a number')
      .required('Income is required')
      .positive(),
    category: yup.string().required('Category is required'),
  };
  return yup.object().shape(validationSchema);
};

export const getExpenseValidationSchema = ({ item, remainingIncome }) => {
  const validationSchema = {
    item: yup.string().required('Description is required'),
    cost: yup
      .number()
      .typeError('Cost must be a number')
      .required('Cost is required')
      .positive()
      .max(
        remainingIncome + (item?.cost || 0),
        `Cost cannot be greater than ${remainingIncome + (item?.cost || 0)}`
      ),
    category: yup.string().required('Category is required'),
  };
  return yup.object().shape(validationSchema);
};

export const addIncome = ({ id, item, income, pie }) => {
  pie.income.push({ id: id, income: income, item: item });
  return pie;
};

export const addExpense = ({ id, item, cost, category, pie }) => {
  Object.keys(pie.expenses).includes(category)
    ? pie.expenses[category].push({ id, item, cost })
    : (pie.expenses[category] = [{ id, item, cost }]);

  return pie;
};

export const removeExpense = ({ item, category, pie }) => {
  const updatedCategory = pie.expenses[category].filter(
    (expense) => expense.id !== item.id
  );

  // If this item is the final item within the category, remove category
  updatedCategory.length > 0
    ? (pie.expenses[category] = updatedCategory)
    : delete pie.expenses[category];

  return pie;
};
