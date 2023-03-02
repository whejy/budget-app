import { TextInput as NativeTextInput, StyleSheet, Button } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import { useField } from 'formik';
import theme from '../../theme';
import MyModal from './Modal';
import Text from './Text';

const styles = StyleSheet.create({
  input: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  error: {
    borderColor: theme.colors.error,
  },
  errorText: {
    marginTop: 5,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, error && styles.error, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

const SelectInput = ({ style, error, ...props }) => {
  const selectInputStyle = [styles.input, error && styles.error, style];

  return <Picker style={selectInputStyle} {...props} />;
};

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

export const FormikNumberInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const onChange = (value) => {
    const numeric = /^[0-9\b]+$/;

    if (value === '' || numeric.test(value)) {
      helpers.setValue(value);
    }
  };

  return (
    <>
      <TextInput
        onChangeText={(value) => onChange(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        keyboardType="numeric"
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
    [field.value.endDate]: {
      selected: true,
      marked: true,
      selectedColor: 'green',
    },
  };

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
        // onBlur={() => helpers.setTouched(true)}
        showSoftInputOnFocus={false}
        placeholder="Period beginning"
        onPressIn={() => openModal('startDate')}
        onClick={() => openModal('startDate')}
      />
      {showError?.startDate && (
        <Text style={styles.errorText}>{meta.error.startDate}</Text>
      )}
      <TextInput
        value={field.value.endDate}
        name="endDate"
        // onBlur={() => helpers.setTouched(true)}
        showSoftInputOnFocus={false}
        placeholder="Period ending"
        onPressIn={() => openModal('endDate')}
        onClick={() => openModal('endDate')}
      />
      {showError?.endDate && (
        <Text style={styles.errorText}>{meta.error.endDate}</Text>
      )}

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
        <Button title="Cancel" onPress={() => setModalOpen(false)} />
      </MyModal>
    </>
  );
};
