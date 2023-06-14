import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '../../components/Button';
import FormikDatesInput from '../../Formik/FormikDatesInput';
import FormikTextInput from '../../Formik/FormikTextInput';
import FormikSelectInput from '../../Formik/FormikSelectInput';
import FormikNumberInput from '../../Formik/FormikNumberInput';

const FormFields = ({
  onSubmit,
  onCancel,
  onDelete,
  formCategory,
  setFormCategory,
  incomeCategory,
  incomeIsRemovable,
  categories,
  dates,
}) => {
  const minDate = dates.startDate;
  const maxDate = dates.endDate;

  const buttons =
    incomeCategory && !incomeIsRemovable ? (
      <>
        <Button title="Update" onPress={onSubmit} variant="primary" />
        <Button title="Cancel" onPress={onCancel} variant="primary" />
      </>
    ) : onDelete ? (
      <>
        <Button title="Delete" onPress={onDelete} variant="secondary" />
        <Button title="Update" onPress={onSubmit} variant="primary" />
        <Button title="Cancel" onPress={onCancel} variant="primary" />
      </>
    ) : (
      <>
        <Button
          title="Add"
          onPress={onSubmit}
          style={styles.addButton}
          variant="primary"
        />
        <Button title="Cancel" onPress={onCancel} variant="primary" />
      </>
    );

  return (
    <View style={styles.form}>
      <FormikTextInput name="item" placeholder="Description" />
      <FormikNumberInput name="amount" placeholder="Amount" />
      {formCategory !== 'Income' && (
        <FormikDatesInput name="date" minDate={minDate} maxDate={maxDate} />
      )}
      {!incomeCategory && (
        <FormikSelectInput setFormCategory={setFormCategory} name="category">
          {categories.map((category, i) => (
            <Picker.Item key={i} label={category} value={category} />
          ))}
        </FormikSelectInput>
      )}
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
    marginTop: 10,
  },
  addButton: {
    paddingHorizontal: 25,
  },
  form: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 15,
  },
});

export default FormFields;
