/* eslint-disable no-unused-vars */
import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';
import { FormikDateInput, FormikTextInput } from './FormikInputs';
import { parseNumber } from '../utils';

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 15,
  },
});

const initialValues = {
  income: '',
  startDate: '',
  endDate: '',
};

const validationSchema = yup.object().shape({
  income: yup.number().required('Cost is required').positive(),
  startDate: yup.string().required('Item is required'),
  endDate: yup.string().required('Item is required'),
});

const PieForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput
        name="income"
        placeholder="Income"
        keyboardType="numeric"
      />
      <FormikDateInput name="startDate" />
      <FormikDateInput name="endDate" />
      <Button onPress={onSubmit} title="Add Pie">
        Add Pie
      </Button>
    </View>
  );
};

const AddPie = ({ updateList }) => {
  const onSubmit = (values) => {
    class Pie {
      constructor({ startDate, endDate, income }) {
        this.id = uuid();
        this.startDate = startDate;
        this.endDate = endDate;
        this.income = income;
        this.expenses = [];
      }
    }

    const parsedData = {
      startDate: values.startDate,
      endDate: values.endDate,
      income: parseNumber(values.income),
    };

    return updateList(new Pie(parsedData));
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <PieForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default AddPie;
