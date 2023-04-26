import { View, StyleSheet, Platform } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import uuid from 'react-native-uuid';
import FormikDateInput from '../../Formik/FormikDateInput';
import FormikNumberInput from '../../Formik/FormikNumberInput';
import { PrimaryButton, CancelButton } from '../../components/Button';
import { parseNumber, parseDates } from '../../../utils/helpers';

const initialValues = {
  income: '',
  dates: { startDate: '', endDate: '' },
};

const validationSchema = yup.object().shape({
  income: yup
    .number()
    .typeError('Income must be a number')
    .required('Income is required')
    .positive(),
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
        autoFocus
        onBlur={null}
      />
      <FormikDateInput name="dates" />
      <View style={styles.buttons}>
        <PrimaryButton title="Add Pie" onPress={onSubmit} />
        {Platform.OS === 'android' && <View style={{ paddingHorizontal: 5 }} />}
        <CancelButton title="Cancel" onPress={closeModal} />
      </View>
    </View>
  );
};

const AddPieForm = ({ updateList, closeModal }) => {
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
