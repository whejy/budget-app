import { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { useField } from 'formik';
import { PrimaryButton } from '../components/Button';
import { TextInput } from './Inputs';
import MyModal from '../Modals/Modal';
import { ErrorText } from '../components/Text';
import theme from '../../theme';

const FormikDateInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputCaller, setInputCaller] = useState('');
  const showError = meta.touched && meta.error;

  const markedDates = {
    [field.value.startDate]: {
      selected: true,
      marked: true,
      selectedColor: theme.colors.primary,
    },
    [field.value.endDate]: {
      selected: true,
      marked: true,
      selectedColor: theme.colors.secondary,
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
        showSoftInputOnFocus={false}
        placeholder="Period beginning"
        onPressIn={() => openModal('startDate')}
        onClick={() => openModal('startDate')}
      />
      {showError?.startDate && <ErrorText>{meta.error.startDate}</ErrorText>}
      <TextInput
        value={field.value.endDate}
        name="endDate"
        showSoftInputOnFocus={false}
        placeholder="Period ending"
        onPressIn={() => openModal('endDate')}
        onClick={() => openModal('endDate')}
      />
      {showError?.endDate && <ErrorText>{meta.error.endDate}</ErrorText>}

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
        <PrimaryButton title="Cancel" onPress={() => setModalOpen(false)} />
      </MyModal>
    </>
  );
};

export default FormikDateInput;
