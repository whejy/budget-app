import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 15,
  },
});

const ExpenseForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="name" placeholder="Name" />
      <FormikTextInput
        name="cost"
        placeholder="Amount"
        keyboardType="numeric"
      />
      <Button onPress={onSubmit} title="Add Expense">
        Add Expense
      </Button>
    </View>
  );
};

const initialValues = {
  name: '',
  cost: 0,
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  cost: yup
    .number()
    .min(0.5, 'Amount must be greater or equal to 0.50')
    .required('Amount is required'),
});

const AddExpense = () => {
  const onSubmit = (values) => {
    let today = new Date();
    console.log(today);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    console.log(values, today);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <ExpenseForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default AddExpense;
