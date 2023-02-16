import { Keyboard, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useField } from 'formik';
import { TextInput, SelectInput } from './InputTypes';
import CalendarModal from './CalendarModal';
import Text from './Text';
import { Calendar } from 'react-native-calendars';

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

export const FormikDateInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const [modalOpen, setModalOpen] = useState(false);
  const showError = meta.touched && meta.error;

  const markedDates = {
    [field.value]: { selected: true, marked: true },
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const handlePress = (day) => {
    helpers.setValue(day.dateString);
    setModalOpen(false);
  };

  return (
    <>
      <TextInput
        value={field.value}
        onBlur={() => helpers.setTouched(true)}
        // onChangeText={(value) => helpers.setValue(value)}
        placeholder="YYYY-DD-MM"
        onFocus={() => {
          Keyboard.dismiss();
        }}
        onPressIn={openModal}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
      <CalendarModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <Calendar
          selectedValue={field.value}
          error={showError}
          {...props}
          // onValueChange={(value) => helpers.setValue(value)}
          // onBlur={() => helpers.setTouched(true)}
          onDayPress={(day) => handlePress(day)}
          markedDates={markedDates}
        />
      </CalendarModal>
    </>
  );
};
