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
  const [inputCaller, setInputCaller] = useState('');
  const showError = meta.touched && meta.error;

  const markedDates = {
    [field.value.startDate]: { selected: true, marked: true },
    [field.value.endDate]: { selected: true, marked: true },
  };

  console.log(field.value);

  const openModal = (caller) => {
    setInputCaller(caller);
    setModalOpen(true);
  };

  const handlePress = (day) => {
    switch (inputCaller) {
      case 'startDate':
        helpers.setValue({ ...field.value, startDate: day.dateString });
        break;
      case 'endDate':
        helpers.setValue({ ...field.value, endDate: day.dateString });
        break;
      default:
        helpers.setValue({ startDate: '', endDate: '' });
    }
    setModalOpen(false);
  };

  return (
    <>
      <TextInput
        value={field.value.startDate}
        name="startDate"
        onBlur={() => helpers.setTouched(true)}
        showSoftInputOnFocus={false}
        placeholder="YYYY-DD-MM"
        onPressIn={() => openModal('startDate')}
      />
      <TextInput
        value={field.value.endDate}
        name="endDate"
        onBlur={() => helpers.setTouched(true)}
        showSoftInputOnFocus={false}
        placeholder="YYYY-DD-MM"
        onPressIn={() => openModal('endDate')}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
      <MyModal
        animation="slide"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      >
        <Calendar
          selectedValue={field.value.startDate}
          error={showError}
          {...props}
          onDayPress={(day) => handlePress(day)}
          markedDates={markedDates}
        />
      </MyModal>
    </>
  );
};
