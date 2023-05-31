import * as yup from 'yup';

export const getInitialValues = ({ item, selectedCategory }) => {
  return {
    item: item?.item || '',
    amount: (item && String(item.amount)) || '',
    category: selectedCategory || 'Shopping',
  };
};

export const getValidationSchema = ({
  item,
  remainingIncome,
  formCategory,
}) => {
  const validationSchema =
    formCategory === 'Income'
      ? {
          item: yup.string().required('Description is required'),
          amount: yup
            .number()
            .typeError('Amount must be a number')
            .required('Amount is required')
            .positive(),
          category: yup.string().required('Category is required'),
        }
      : {
          item: yup.string().required('Description is required'),
          amount: yup
            .number()
            .typeError('Amount must be a number')
            .required('Amount is required')
            .positive()
            .max(
              remainingIncome + (item?.cost || 0),
              `Cost cannot be greater than ${
                remainingIncome + (item?.cost || 0)
              }`
            ),
          category: yup.string().required('Category is required'),
        };
  return yup.object().shape(validationSchema);
};

export const addIncome = ({ id, item, amount, pie }) => {
  pie.income.push({ id: id, amount: amount, item: item });
  return pie;
};

export const addExpense = ({ id, item, amount, category, pie }) => {
  Object.keys(pie.expenses).includes(category)
    ? pie.expenses[category].push({ id, item, amount })
    : (pie.expenses[category] = [{ id, item, amount }]);

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
