import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { categories } from '../data/categories';
import { Picker } from '@react-native-picker/picker';
import { FormikTextInput, FormikSelectInput } from './FormikInputs';

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
      <FormikTextInput name="item" placeholder="Item" />
      <FormikTextInput name="cost" placeholder="Cost" keyboardType="numeric" />
      <FormikSelectInput name="category">
        <Picker.Item label="Select a category..." value={null} />
        {categories.map((category, i) => (
          <Picker.Item key={i} label={category} value={category} />
        ))}
      </FormikSelectInput>
      <Button onPress={onSubmit} title="Add Expense">
        Add Expense
      </Button>
    </View>
  );
};

const initialValues = {
  item: '',
  cost: 0,
  category: '',
};

const validationSchema = yup.object().shape({
  item: yup.string().required('Item is required'),
  cost: yup
    .number()
    .min(0.5, 'Cost must be greater or equal to 0.50')
    .required('Cost is required'),
  category: yup.string().required('Category is required'),
});

const AddExpense = () => {
  const onSubmit = (values) => {
    console.log(values);

    // const newItem = { item: 'handbag', cost: 500, category: 'Shopping' };
    // const newItem2 = { item: 'gas', cost: 500, category: 'Bills' };

    // //   Adding a category to test following IF/ELSE logic
    // test.expenses = { Shopping: [{ item: 'makeup', cost: 900 }] };

    // //   IF category already exists, add item to category array,
    // // ELSE create category array
    // const addItem = ({ item, cost, category }) => {
    //   Object.keys(test.expenses).includes(category)
    //     ? test.expenses[category].push({ item, cost })
    //     : (test.expenses[category] = [{ item, cost }]);
    // };
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
