import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { categories } from '../data/categories';
import { Picker } from '@react-native-picker/picker';
import { FormikTextInput, FormikSelectInput } from './FormikInputs';
import { parseNumber } from '../utils';

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 15,
  },
});

const initialValues = {
  item: '',
  cost: '',
  category: '',
};

const validationSchema = yup.object().shape({
  item: yup.string().required('Item is required'),
  cost: yup.number().required('Cost is required').positive(),
  category: yup.string().required('Category is required'),
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

const AddExpense = ({ pie, updatePie }) => {
  const onSubmit = (values) => {
    const parsedData = {
      item: values.item,
      cost: parseNumber(values.cost),
      category: values.category,
    };

    const addItem = ({ item, cost, category }) => {
      Object.keys(pie.expenses).includes(category)
        ? pie.expenses[category].push({ item, cost })
        : (pie.expenses[category] = [{ item, cost }]);
    };

    addItem(parsedData);
    updatePie(pie);
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
