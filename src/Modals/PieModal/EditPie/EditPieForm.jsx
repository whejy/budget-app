import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import uuid from 'react-native-uuid';
import FormFields from '../FormFields';
import { parseNumber } from '../../../../utils/helpers';
import { getInitialValues, getValidationSchema } from '../formhelpers';

const EditPieForm = ({ updateList, closeModal, pie }) => {
  const validationSchema = getValidationSchema();
  const initialValues = getInitialValues(pie);

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
      dates: values.dates,
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
          <FormFields onCancel={closeModal} onSubmit={handleSubmit} edit />
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

export default EditPieForm;
