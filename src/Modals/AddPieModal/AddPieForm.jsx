import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import uuid from 'react-native-uuid';
import FormikDateInput from '../../Formik/FormikDateInput';
import FormikNumberInput from '../../Formik/FormikNumberInput';
import FormikTextInput from '../../Formik/FormikTextInput';
import Button from '../../components/Button';
import { parseNumber } from '../../../utils/helpers';

const initialValues = {
  income: '',
  source: '',
  dates: { startDate: '', endDate: '' },
};

const validationSchema = yup.object().shape({
  income: yup
    .number()
    .typeError('Income must be a number')
    .required('Income is required')
    .positive(),
  source: yup.string().required('Source is required'),
  dates: yup.object().shape({
    startDate: yup.string().required('Start date is required'),
    endDate: yup.string().required('End date is required'),
  }),
});

const FormFields = ({ onSubmit, closeModal }) => {
  return (
    <View style={styles.form}>
      <FormikNumberInput
        name="income"
        placeholder="Income"
        keyboardType="numeric"
      />
      <FormikTextInput name="source" placeholder="Income Source" />
      <FormikDateInput name="dates" />
      <View style={styles.buttons}>
        <Button title="Add Pie" variant="primary" onPress={onSubmit} />
        <Button title="Cancel" variant="primary" onPress={closeModal} />
      </View>
    </View>
  );
};

const AddPieForm = ({ updateList, closeModal }) => {
  const onSubmit = (values) => {
    class Pie {
      constructor({ dates, amount, source }) {
        this.id = uuid.v4();
        this.dates = dates;
        this.income = [{ amount: amount, source: source }];
        this.expenses = {};
      }
    }

    const parsedData = {
      dates: values.dates,
      amount: parseNumber(values.income),
      source: values.source,
    };

    closeModal();
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
          <FormFields closeModal={closeModal} onSubmit={handleSubmit} />
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  form: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 15,
  },
});

export default AddPieForm;
