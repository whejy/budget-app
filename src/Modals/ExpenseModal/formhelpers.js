import * as yup from 'yup';

export const getInitialValues = (selectedCategory, item = null) => {
  const initialValues = {
    item: item?.item || '',
    cost: (item && String(item.cost)) || '',
    category: (selectedCategory !== 'Income' && selectedCategory) || 'Shopping',
  };
  return initialValues;
};

export const getValidationSchema = (remainingIncome, itemCost = 0) => {
  return yup.object().shape({
    item: yup.string().required('Item is required'),
    cost: yup
      .number()
      .required('Cost is required')
      .positive()
      .max(remainingIncome + itemCost),
    category: yup.string().required('Category is required'),
  });
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
