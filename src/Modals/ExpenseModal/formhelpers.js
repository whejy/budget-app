import * as yup from 'yup';

export const getInitialValues = (
  selectedCategory,
  item = null,
  dropdownCategory = null
) => {
  const initialValues =
    dropdownCategory === 'Income'
      ? {
          amount: '',
          category: 'Income',
        }
      : {
          item: item?.item || '',
          cost: (item && String(item.cost)) || '',
          category:
            (selectedCategory !== 'Income' && selectedCategory) || 'Shopping',
        };
  return initialValues;
};

export const getValidationSchema = (
  remainingIncome,
  itemCost = 0,
  dropdownCategory
) => {
  const validationSchema =
    dropdownCategory === 'Income'
      ? {
          amount: yup
            .number()
            .typeError('Amount must be a number')
            .required('Amount is required')
            .positive(),
          category: yup.string().required('Category is required'),
        }
      : {
          item: yup.string().required('Description is required'),
          cost: yup
            .number()
            .typeError('Cost must be a number')
            .required('Cost is required')
            .positive()
            .lessThan(
              remainingIncome + itemCost,
              `Cost cannot be greater than ${remainingIncome + itemCost}`
            ),
          category: yup.string().required('Category is required'),
        };
  return yup.object().shape(validationSchema);
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
