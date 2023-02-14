import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { FormikTextInput } from './FormikInputs';
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
  weekStart: '',
  weekEnd: '',
};

const validationSchema = yup.object().shape({
  income: yup.number().required('Cost is required').positive(),
  weekStart: yup.string().required('Item is required'),
  weekEnd: yup.string().required('Item is required'),
});

const PieForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput
        name="income"
        placeholder="Income"
        keyboardType="numeric"
      />
      <FormikTextInput name="weekStart" placeholder="Start Date" />
      <FormikTextInput name="weekEnd" placeholder="End Date" />
      <Button onPress={onSubmit} title="Add Pie">
        Add Pie
      </Button>
    </View>
  );
};

const AddPie = ({ updateList }) => {
  const onSubmit = (values) => {
    // values.date = String(new Date());

    class Pie {
      constructor({ weekStart, weekEnd, income }) {
        this.weekStart = weekStart;
        this.weekEnd = weekEnd;
        this.income = income;
        this.expenses = [];
      }
    }

    const parsedData = {
      weekStart: values.weekStart,
      weekEnd: values.weekEnd,
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
