import { useState } from 'react';
import { useField } from 'formik';
import { TextInput } from '../Inputs';
import { ErrorText } from '../../components/Text';
import Calendar from '../../Modals/CalendarModal';

const PeriodInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputCaller, setInputCaller] = useState('');
  const showError = meta.touched && meta.error;

  const openModal = (caller) => {
    setInputCaller(caller);
    setModalOpen(true);
  };

  const toggleModal = () => setModalOpen(!modalOpen);

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
    toggleModal();
  };

  return (
    <>
      <TextInput
        value={field.value.startDate}
        name="startDate"
        showSoftInputOnFocus={false}
        placeholder="Period beginning"
        error={showError?.startDate}
        onPressIn={() => openModal('startDate')}
        onClick={() => openModal('startDate')}
      />
      {showError?.startDate && <ErrorText>{meta.error.startDate}</ErrorText>}
      <TextInput
        value={field.value.endDate}
        name="endDate"
        showSoftInputOnFocus={false}
        placeholder="Period ending"
        error={showError?.endDate}
        onPressIn={() => openModal('endDate')}
        onClick={() => openModal('endDate')}
      />
      {showError?.endDate && <ErrorText>{meta.error.endDate}</ErrorText>}

      <Calendar
        dates={field.value}
        modalOpen={modalOpen}
        onClose={toggleModal}
        initialDate={field.value.startDate}
        error={showError}
        onDayPress={(day) => handlePress(day)}
        {...props}
      />
    </>
  );
};

export default PeriodInput;
