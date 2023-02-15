import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import { TextInput, SelectInput, DateInput } from './InputTypes';
import Text from './Text';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
  },
});

export const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export const FormikSelectInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <SelectInput
        onValueChange={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        selectedValue={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export const FormikDateSelect = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const markedDates = {
    [field.value.weekStart]: { startingDay: 'true', color: 'green' },
    [field.value.weekEnd]: { endingDay: 'true', color: 'green' },
  };

  console.log('HERE');

  const setDates = (day) => {
    switch (field.value.weekStart) {
      case '':
        helpers.setValue({ weekStart: day.dateString, weekEnd: '' });
        break;
      default:
        helpers.setValue({ ...field.value, weekEnd: day.dateString });
        break;
    }
  };

  const resetDates = () => helpers.setValue({ weekStart: '', weekEnd: '' });

  return (
    <>
      <DateInput
        // selectedValue={field.value}
        error={showError}
        {...props}
        // onValueChange={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        onDayPress={(day) => setDates(day)}
        onDayLongPress={() => resetDates()}
        markingType={'period'}
        markedDates={markedDates}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};
