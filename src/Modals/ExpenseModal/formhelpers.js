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
  const calc = item ? item.amount - remainingIncome : 0;
  const magicNumber = calc > 0 ? calc : 0;
  const validationSchema =
    formCategory === 'Income'
      ? {
          item: yup.string().required('Description is required'),
          amount: yup
            .number()
            .typeError('Amount must be a number')
            .required('Amount is required')
            .positive()
            .min(magicNumber, `Income must be at least ${magicNumber}`),
        }
      : {
          item: yup.string().required('Description is required'),
          amount: yup
            .number()
            .typeError('Amount must be a number')
            .required('Amount is required')
            .positive('Amount must be greater than 0')
            .max(
              remainingIncome + (item?.cost || 0),
              `Amount cannot be greater than ${
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

export const removeIncome = ({ incomeToRemove, pie }) => {
  const updatedIncome = pie.income.filter(
    (income) => income.id !== incomeToRemove.id
  );
  pie.income = updatedIncome;
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
