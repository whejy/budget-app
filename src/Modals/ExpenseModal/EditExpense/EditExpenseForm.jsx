import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormFields from '../FormFields';
import { parseNumber } from '../../../../utils/helpers';
import { getInitialValues, getValidationSchema } from '../helpers';

const EditExpenseForm = ({
  updateExpense,
  removeExpense,
  item,
  closeModal,
  category,
  remainingIncome,
}) => {
  const initialValues = getInitialValues(category, item);
  const validationSchema = getValidationSchema(remainingIncome, item.cost);

  const onDelete = () => {
    closeModal();
    removeExpense(item);
  };

  const onSubmit = (values) => {
    closeModal();
    if (values !== initialValues) {
      const newCategory = values.category;
      const updatedItem = {
        id: item.id,
        item: values.item,
        cost: parseNumber(values.cost),
      };
      return updateExpense({ updatedItem, newCategory });
    }
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
