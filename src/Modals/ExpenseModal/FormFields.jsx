import { View, Button, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { categories } from '../../data/categories';
import { PrimaryButton, SecondaryButton } from '../../components/Button';
import FormikTextInput from '../../Formik/FormikTextInput';
import FormikSelectInput from '../../Formik/FormikSelectInput';
import FormikNumberInput from '../../Formik/FormikNumberInput';

const FormFields = ({ onSubmit, onCancel, onDelete }) => {
  const buttons = onDelete ? (
    <>
      {Platform.select({
        ios: (
          <>
            <Button title="Delete" onPress={onDelete} color="red" />
            <Button title="Update" onPress={onSubmit} />
            <Button title="Cancel" onPress={onCancel} />
          </>
        ),
        android: (
          <>
            <SecondaryButton title="Delete" onPress={onDelete} />
            <View style={{ paddingHorizontal: 2.5 }} />
            <PrimaryButton title="Update" onPress={onSubmit} />
            <View style={{ paddingHorizontal: 2.5 }} />
            <PrimaryButton title="Cancel" onPress={onCancel} />
          </>
        ),
      })}
    </>
  ) : (
    <>
      <PrimaryButton title="Add Expense" onPress={onSubmit} />
      {Platform.OS === 'android' && <View style={{ paddingHorizontal: 5 }} />}
      <PrimaryButton title="Cancel" onPress={onCancel} />
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
