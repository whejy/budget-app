import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { categories } from '../../data/categories';
import Button from '../../components/Button';
import FormikTextInput from '../../Formik/FormikTextInput';
import FormikSelectInput from '../../Formik/FormikSelectInput';
import FormikNumberInput from '../../Formik/FormikNumberInput';

export const ExpenseFormFields = ({
  onSubmit,
  onCancel,
  onDelete,
  setFormCategory,
}) => {
  const buttons = onDelete ? (
    <>
      <Button title="Delete" onPress={onDelete} variant="secondary" />
      <Button title="Update" onPress={onSubmit} variant="primary" />
      <Button title="Cancel" onPress={onCancel} variant="primary" />
    </>
  ) : (
    <>
      <Button title="Add Expense" onPress={onSubmit} variant="primary" />
      <Button title="Cancel" onPress={onCancel} variant="primary" />
    </>
  );

  return (
    <View style={styles.form}>
      <FormikNumberInput name="cost" placeholder="Cost" />
      <FormikTextInput name="item" placeholder="Description" />
      <FormikSelectInput setFormCategory={setFormCategory} name="category">
        {categories.map((category, i) => (
          <Picker.Item key={i} label={category} value={category} />
        ))}
      </FormikSelectInput>
      <View style={styles.buttons}>{buttons}</View>
    </View>
  );
};

export const IncomeFormFields = ({ onSubmit, onCancel, setFormCategory }) => {
  return (
    <View style={styles.form}>
      <FormikNumberInput name="income" placeholder="Income" />
      <FormikTextInput name="item" placeholder="Income Source" />
      <FormikSelectInput setFormCategory={setFormCategory} name="category">
        {categories.map((category, i) => (
          <Picker.Item key={i} label={category} value={category} />
        ))}
      </FormikSelectInput>
      <View style={styles.buttons}>
        <Button title="Add Income" onPress={onSubmit} variant="primary" />
        <Button title="Cancel" onPress={onCancel} variant="primary" />
      </View>
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
