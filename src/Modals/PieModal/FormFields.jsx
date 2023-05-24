import { View, StyleSheet } from 'react-native';
import FormikNumberInput from '../../Formik/FormikNumberInput';
import FormikDateInput from '../../Formik/FormikDateInput';
import Button from '../../components/Button';

const FormFields = ({ onSubmit, onCancel, edit }) => {
  const submitTitle = edit ? 'Update Pie' : 'Add Pie';

  return (
    <View style={styles.form}>
      <FormikNumberInput
        name="income"
        placeholder="Income"
        keyboardType="numeric"
      />
      <FormikDateInput name="dates" />
      <View style={styles.buttons}>
        <Button title={submitTitle} variant="primary" onPress={onSubmit} />
        <Button title="Cancel" variant="primary" onPress={onCancel} />
      </View>
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

export default FormFields;
