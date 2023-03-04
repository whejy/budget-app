import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormFields from '../FormFields';
import { parseNumber } from '../../../../utils/helpers';
import { addExpense, getInitialValues, getValidationSchema } from '../helpers';

const EditExpenseForm = ({
  pie,
  item,
  category,
  remainingIncome,
  savePie,
  closeModal,
}) => {
  const initialValues = getInitialValues(category, item);
  const validationSchema = getValidationSchema(remainingIncome, item.cost);

  const updateExpense = (updatedItem) => {
    const updatedPie = removeExpense(updatedItem);
    return updatedPie;
  };

  const removeExpense = (expenseToRemove) => {
    const updatedCategory = pie.expenses[category].filter(
      (expense) => expense.id !== expenseToRemove.id
    );

    // If this item is the final item within the category, remove category
    updatedCategory.length > 0
      ? (pie.expenses[category] = updatedCategory)
      : delete pie.expenses[category];

    return pie;
  };

  const onDelete = () => {
    const updatedPie = removeExpense(item);
    closeModal();
    savePie(updatedPie);
  };

  const onSubmit = (values) => {
    if (values !== initialValues) {
      const newCategory = values.category;

      const updatedItem = {
        id: item.id,
        item: values.item,
        cost: parseNumber(values.cost),
      };

      const pie = updateExpense(updatedItem);

      const updatedPie = addExpense({
        pie,
        ...updatedItem,
        category: newCategory,
      });

      return savePie(updatedPie);
    }
    closeModal();
  };

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 15,
  },
});

export default EditExpenseForm;
