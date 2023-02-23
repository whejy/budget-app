import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import uuid from 'react-native-uuid';
import { FormikDateInput, FormikTextInput } from './FormikInputs';
import { parseNumber, parseDates } from '../../utils/helpers';

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
  dates: yup.object().shape({
    startDate: yup.string().required('Start date is required'),
    endDate: yup.string().required('End date is required'),
  }),
});

const PieForm = ({ onSubmit, setModalOpen }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput
        name="income"
        placeholder="Income"
        keyboardType="numeric"
        autoFocus
        onBlur={null}
      />
      <FormikDateInput name="dates" />
      <Button title="Add Pie" onPress={onSubmit} />
      <Button title="Cancel" onPress={() => setModalOpen(false)} />
    </View>
  );
};

const AddPie = ({ updateList, setModalOpen }) => {
  const onSubmit = (values) => {
    class Pie {
      constructor({ dates, income }) {
        this.id = uuid.v4();
        this.dates = dates;
        this.income = income;
        this.expenses = {};
      }
    }

    const parsedData = {
      dates: parseDates(values.dates),
      income: parseNumber(values.income),
    };

    setModalOpen(false);
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
          <PieForm setModalOpen={setModalOpen} onSubmit={handleSubmit} />
        )}
      </Formik>
    </View>
  );
};

export default AddPie;
