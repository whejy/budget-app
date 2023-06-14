import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikDatesInput from '../../Formik/FormikDatesInput';
import Button from '../../components/Button';

const validationSchema = yup.object().shape({
  dates: yup.object().shape({
    startDate: yup.string().required('Start date is required'),
    endDate: yup.string().required('End date is required'),
  }),
});

const FormFields = ({ onSubmit, closeModal }) => {
  return (
    <View style={styles.form}>
      <FormikDatesInput name="dates" />
      <View style={styles.buttons}>
        <Button title="Update" variant="primary" onPress={onSubmit} />
        <Button title="Cancel" variant="primary" onPress={closeModal} />
      </View>
    </View>
  );
};

const EditDatesForm = ({ closeModal, savePie, pie }) => {
  const { dates } = pie;
  const initialValues = { dates };

  const onSubmit = (values) => {
    if (values !== initialValues) {
      pie.dates = values.dates;
      savePie(pie);
    }
    closeModal();
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

export default EditDatesForm;
