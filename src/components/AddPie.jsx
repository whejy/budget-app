/* eslint-disable no-unused-vars */
import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import usePies from '../hooks/usePies';
import { FormikTextInput } from './FormikInputs';

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 15,
  },
});

const PieForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="income" placeholder="Income" />
      <FormikTextInput name="weekStart" placeholder="Start Date" />
      <FormikTextInput name="weekEnd" placeholder="End Date" />
      <Button onPress={onSubmit} title="Add Pie">
        Add Pie
      </Button>
    </View>
  );
};

const initialValues = {
  income: 0,
  weekStart: '',
  weekEnd: '',
};

const validationSchema = yup.object().shape({
  income: yup
    .number()
    .min(0.5, 'Cost must be greater or equal to 0.50')
    .required('Cost is required'),
  weekStart: yup.string().required('Item is required'),
  weekEnd: yup.string().required('Item is required'),
});

const AddPie = () => {
  const pies = usePies();
  const onSubmit = (values) => {
    // values.date = String(new Date());

    const createPie = ({ weekStart, weekEnd, income }) => {
      class Pie {
        constructor(weekStart, weekEnd, income) {
          this.weekStart = weekStart;
          this.weekEnd = weekEnd;
          this.income = income;
        }
      }
      return new Pie(weekStart, weekEnd, income);
    };

    const newPie = createPie(values);
    pies.addPie(newPie);
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
