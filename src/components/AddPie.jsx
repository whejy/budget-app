/* eslint-disable no-unused-vars */
import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';
import { FormikDateInput, FormikTextInput } from './FormikInputs';
import { parseNumber } from '../../utils/helpers';

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 15,
  },
});

const initialValues = {
  income: '',
  dates: { startDate: '', endDate: '' },
};

const validationSchema = yup.object().shape({
  income: yup.number().required('Income is required').positive(),
  // startDate: yup.string().required('Start date is required'),
  // endDate: yup.string().required('End date is required'),
});

const PieForm = ({ onSubmit, onCancel }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput
        name="income"
        placeholder="Income"
        keyboardType="numeric"
      />
      <FormikDateInput name="dates" />
      <Button title="Add Pie" onPress={onSubmit} />
      <Button title="Cancel" onPress={onCancel} />
    </View>
  );
};

const AddPie = ({ updateList, setForm }) => {
  const onSubmit = (values) => {
    class Pie {
      constructor({ dates, income }) {
        this.id = uuid();
        this.dates = dates;
        this.income = income;
        this.expenses = [];
      }
    }

    const parsedData = {
      dates: values.dates,
      income: parseNumber(values.income),
    };

    setForm(false);
    return updateList(new Pie(parsedData));
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <PieForm onSubmit={handleSubmit} onCancel={() => setForm(false)} />
        )}
      </Formik>
    </View>
  );
};

export default AddPie;
