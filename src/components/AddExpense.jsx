import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { categories } from '../data/categories';
// import { useState } from 'react';
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
  category: null,
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
    let today = new Date();
    // var dd = String(today.getDate()).padStart(2, '0');
    // var mm = String(today.getMonth() + 1).padStart(2, '0');
    // var yyyy = today.getFullYear();

    // today = dd + '/' + mm + '/' + yyyy;
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
