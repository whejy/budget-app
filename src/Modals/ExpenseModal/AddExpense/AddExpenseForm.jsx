import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormFields from '../FormFields';
import { parseNumber, parseString } from '../../../../utils/helpers';
import {
  addExpense,
  getInitialValues,
  getValidationSchema,
} from '../formhelpers';

const AddExpenseForm = ({
  pie,
  savePie,
  closeModal,
  remainingIncome,
  selectedCategory,
}) => {
  const initialValues = getInitialValues(selectedCategory);
  const validationSchema = getValidationSchema(remainingIncome);

  const onSubmit = (values) => {
    const id = Math.round(1000 * Math.random());
    const parsedData = {
      id: id,
      item: parseString(values.item),
      cost: parseNumber(values.cost),
      category: values.category,
      pie: pie,
    };
    closeModal();
    const updatedPie = addExpense(parsedData);
    return savePie(updatedPie);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <FormFields onSubmit={handleSubmit} onCancel={closeModal} />
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

export default AddExpenseForm;
