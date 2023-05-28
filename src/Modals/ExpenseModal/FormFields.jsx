import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '../../components/Button';
import FormikTextInput from '../../Formik/FormikTextInput';
import FormikSelectInput from '../../Formik/FormikSelectInput';
import FormikNumberInput from '../../Formik/FormikNumberInput';

const FormFields = ({
  onSubmit,
  onCancel,
  onDelete,
  categories,
  dropdownCategory,
  setDropdownCategory,
}) => {
  const submitButton =
    dropdownCategory === 'Income' ? 'Add Income' : 'Add Expense';

  const buttons = onDelete ? (
    <>
      <Button title="Delete" onPress={onDelete} variant="secondary" />
      <Button title="Update" onPress={onSubmit} variant="primary" />
      <Button title="Cancel" onPress={onCancel} variant="primary" />
    </>
  ) : (
    <>
      <Button title={submitButton} onPress={onSubmit} variant="primary" />
      <Button title="Cancel" onPress={onCancel} variant="primary" />
    </>
  );

  const form =
    dropdownCategory === 'Income' ? (
      <>
        <FormikNumberInput name="amount" placeholder="Amount" />
        <FormikSelectInput
          name="category"
          setDropdownCategory={setDropdownCategory}
        >
          {categories.map((category, i) => (
            <Picker.Item key={i} label={category} value={category} />
          ))}
        </FormikSelectInput>
      </>
    ) : (
      <>
        <FormikTextInput name="item" placeholder="Description" />
        <FormikNumberInput name="cost" placeholder="Cost" />
        <FormikSelectInput
          name="category"
          setDropdownCategory={setDropdownCategory}
        >
          {categories.map((category, i) => (
            <Picker.Item key={i} label={category} value={category} />
          ))}
        </FormikSelectInput>
      </>
    );

  return (
    <View style={styles.form}>
      {form}
      <View style={styles.buttons}>{buttons}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 15,
  },
});

export default FormFields;
