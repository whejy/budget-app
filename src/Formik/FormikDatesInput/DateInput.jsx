import { useState } from 'react';
import { useField } from 'formik';
import { TextInput } from '../Inputs';
import { ErrorText } from '../../components/Text';
import Calendar from '../../Modals/CalendarModal';

const DateInput = ({ name, minDate, maxDate, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const [modalOpen, setModalOpen] = useState(false);
  const showError = meta.touched && meta.error;

  const toggleModal = () => setModalOpen(!modalOpen);

  const handlePress = (value) => {
    helpers.setValue(value.dateString);
    toggleModal();
  };

  return (
    <>
      <TextInput
        value={field.value}
        name="date"
        showSoftInputOnFocus={false}
        placeholder="Date"
        error={showError}
        onPressIn={toggleModal}
      />
      {showError && <ErrorText>{meta.error}</ErrorText>}
      <Calendar
        dates={field.value}
        modalOpen={modalOpen}
        onClose={toggleModal}
        minDate={minDate}
        maxDate={maxDate}
        error={showError}
        onDayPress={handlePress}
        {...props}
      />
    </>
  );
};

export default DateInput;
