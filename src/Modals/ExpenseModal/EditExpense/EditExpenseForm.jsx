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
  getValidationSchema,
} from '../formhelpers';

const EditExpenseForm = ({
  item,
  initialPie,
  initialCategory,
  remainingIncome,
  savePie,
  closeModal,
}) => {
  // const incomeIsRemovable = item?.amount - remainingIncome < 0;
  // console.log(item?.amount - remainingIncome);
  // console.log(incomeIsRemovable);
  const initialValues = getInitialValues({
    selectedCategory: initialCategory,
    item,
  });
  const validationSchema = getValidationSchema({
    formCategory: initialCategory,
    remainingIncome,
    item,
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
            incomeRemovable={initialPie.income.length > 1}
          />
        )}
      </Formik>
    </View>
  );
};

export default EditExpenseForm;
