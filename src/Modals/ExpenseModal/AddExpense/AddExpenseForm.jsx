import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { ExpenseFormFields } from '../FormFields';
import { parseNumber, parseString } from '../../../../utils/helpers';
import {
  addExpense,
  getExpenseInitialValues,
  getExpenseValidationSchema,
} from '../formhelpers';

const AddExpenseForm = ({
  pie,
  savePie,
  onClose,
  remainingIncome,
  formCategory,
  setFormCategory,
}) => {
  const initialValues = getExpenseInitialValues({
    formCategory,
  });
  const validationSchema = getExpenseValidationSchema({
    remainingIncome,
  });

  const onSubmit = (values) => {
    const parsedData = {
      id: Math.round(1000 * Math.random()),
      item: parseString(values.item),
      cost: parseNumber(values.cost),
      category: values.category,
      pie: pie,
    };

    onClose();
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
          <ExpenseFormFields
            onSubmit={handleSubmit}
            onCancel={onClose}
            formCategory={formCategory}
            setFormCategory={setFormCategory}
          />
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AddExpenseForm;
