import { View, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { categories } from '../../data/categories';
import FormikTextInput from '../../components/FormikTextInput';
import FormikSelectInput from '../../components/FormikSelectInput';
import FormikNumberInput from '../../components/FormikNumberInput';

const FormFields = ({ onSubmit, onCancel, onDelete }) => {
  const buttons = onDelete ? (
    <>
      <Button title="Delete" onPress={onDelete} color="red" />
      <Button title="Update" onPress={onSubmit} />
      <Button title="Cancel" onPress={onCancel} />
    </>
  ) : (
    <>
      <Button title="Add Expense" onPress={onSubmit} />
      <Button title="Cancel" onPress={onCancel} />
    </>
  );

  return (
    <View style={styles.form}>
      <FormikTextInput name="item" placeholder="Item" />
      <FormikNumberInput name="cost" placeholder="Cost" />
      <FormikSelectInput name="category">
        {categories.map((category, i) => (
          <Picker.Item key={i} label={category} value={category} />
        ))}
      </FormikSelectInput>
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
