/* eslint-disable no-unused-vars */
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { useField } from 'formik';
import { TextInput, SelectInput } from './InputTypes';
import MyModal from './Modal';
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

  console.log(field);

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
        showSoftInputOnFocus={false}
        placeholder="YYYY-DD-MM"
        onPressIn={openModal}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
      <MyModal
        animation="slide"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      >
        <Calendar
          selectedValue={field.value}
          error={showError}
          {...props}
          // onValueChange={(value) => helpers.setValue(value)}
          // onBlur={() => helpers.setTouched(true)}
          onDayPress={(day) => handlePress(day)}
          markedDates={markedDates}
        />
      </MyModal>
    </>
  );
};
