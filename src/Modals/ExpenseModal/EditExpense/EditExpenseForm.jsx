import { View } from 'react-native';
import { Formik } from 'formik';
import FormFields from '../FormFields';
import { parseNumber, parseString } from '../../../../utils/helpers';
import {
  addExpense,
  removeExpense,
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
  const initialValues = getInitialValues({
    selectedCategory: initialCategory,
    item,
  });
  const validationSchema = getValidationSchema({
    remainingIncome,
    item,
  });

  const onDelete = () => {
    const updatedPie = removeExpense({
      expenseToRemove: item,
      pie: initialPie,
      category: initialCategory,
    });
    savePie(updatedPie);
    closeModal();
  };

  const onSubmit = (values) => {
    if (values !== initialValues) {
      const newCategory = values.category;

      const updatedExpense = {
        id: item.id,
        item: parseString(values.item),
        amount: parseNumber(values.amount),
      };

      const updatedPiePartial = removeExpense({
        expenseToRemove: item,
        pie: initialPie,
        category: initialCategory,
      });

      const updatedPieComplete = addExpense({
        ...updatedExpense,
        pie: updatedPiePartial,
        category: newCategory,
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
          />
        )}
      </Formik>
    </View>
  );
};

export default EditExpenseForm;
