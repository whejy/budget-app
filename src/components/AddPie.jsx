import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { FormikDateSelect, FormikTextInput } from './FormikInputs';
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
  dates: { weekStart: '', weekEnd: '' },
};

const validationSchema = yup.object().shape({
  income: yup.number().required('Cost is required').positive(),
  //   weekStart: yup.string().required('Item is required'),
  //   weekEnd: yup.string().required('Item is required'),
});

const PieForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput
        name="income"
        placeholder="Income"
        keyboardType="numeric"
      />
      <FormikDateSelect name="dates" />
      <Button onPress={onSubmit} title="Add Pie">
        Add Pie
      </Button>
    </View>
  );
};

const AddPie = ({ updateList }) => {
  const onSubmit = (values) => {
    class Pie {
      constructor({ dates, income }) {
        this.dates = dates;
        this.income = income;
        this.expenses = [];
      }
    }

    const parsedData = {
      dates: {
        weekStart: values.dates.weekStart,
        weekEnd: values.dates.weekEnd,
      },
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
