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

export const addItem = ({ id, item, cost, category, pie }) => {
  Object.keys(pie.expenses).includes(category)
    ? pie.expenses[category].push({ id, item, cost })
    : (pie.expenses[category] = [{ id, item, cost }]);

  return pie;
};
