import { View } from 'react-native';
import { Formik } from 'formik';
import FormFields from '../FormFields';
import { parseNumber, parseString } from '../../../../utils/helpers';
import {
  addExpense,
  addIncome,
  removeExpense,
  removeIncome,
  getInitialValues,
  getExpenseValidationSchema,
  getIncomeValidationSchema,
} from '../formhelpers';

const EditExpenseForm = ({
  item,
  initialPie,
  initialCategory,
  remainingIncome,
  savePie,
  closeModal,
}) => {
  const initialValues = getInitialValues({
    item,
    selectedCategory: initialCategory,
  });

  const validationSchema =
    initialCategory === 'Income'
      ? getIncomeValidationSchema({ item, remainingIncome })
      : getExpenseValidationSchema({
          item,
          remainingIncome,
        });

  const onDelete = () => {
    const updatedPie =
      initialCategory === 'Income'
        ? removeIncome({ incomeToRemove: item, pie: initialPie })
        : removeExpense({
            expenseToRemove: item,
            pie: initialPie,
            category: initialCategory,
          });
    savePie(updatedPie);
    closeModal();
  };

  const onSubmit = (values) => {
    if (values !== initialValues) {
      const updatedItem = {
        id: item.id,
        item: parseString(values.item),
        amount: parseNumber(values.amount),
      };

      const updatedPiePartial =
        initialCategory === 'Income'
          ? removeIncome({ incomeToRemove: item, pie: initialPie })
          : removeExpense({
              expenseToRemove: item,
              pie: initialPie,
              category: initialCategory,
            });

      const updatedPieComplete =
        initialCategory === 'Income'
          ? addIncome({ ...updatedItem, pie: updatedPiePartial })
          : addExpense({
              ...updatedItem,
              pie: updatedPiePartial,
              category: values.category,
            });

      savePie(updatedPieComplete);
    }
    closeModal();
  };

  const incomeIsRemovable = item?.amount < remainingIncome;

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <FormFields
            onSubmit={handleSubmit}
            onDelete={onDelete}
            onCancel={closeModal}
            incomeCategory={initialCategory === 'Income'}
            incomeIsRemovable={incomeIsRemovable}
          />
        )}
      </Formik>
    </View>
  );
};

export default EditExpenseForm;
