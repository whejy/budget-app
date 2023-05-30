import { View } from 'react-native';
import { Formik } from 'formik';
import { ExpenseFormFields } from '../FormFields';
import { parseNumber, parseString } from '../../../../utils/helpers';
import {
  addExpense,
  removeExpense,
  getExpenseInitialValues,
  getExpenseValidationSchema,
} from '../formhelpers';

const EditExpenseForm = ({
  item,
  initialPie,
  initialCategory,
  remainingIncome,
  savePie,
  closeModal,
}) => {
  const initialValues = getExpenseInitialValues({
    formCategory: initialCategory,
    item,
  });
  const validationSchema = getExpenseValidationSchema({
    remainingIncome,
    item,
  });

  const onDelete = () => {
    const updatedPie = removeExpense({
      item,
      pie: initialPie,
      category: initialCategory,
    });
    savePie(updatedPie);
    closeModal();
  };

  const onSubmit = (values) => {
    if (values !== initialValues) {
      const newCategory = values.category;

      const updatedItem = {
        id: item.id,
        item: parseString(values.item),
        cost: parseNumber(values.cost),
      };

      const updatedPiePartial = removeExpense({
        item: updatedItem,
        pie: initialPie,
        category: initialCategory,
      });

      const updatedPieComplete = addExpense({
        ...updatedItem,
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
          <ExpenseFormFields
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
