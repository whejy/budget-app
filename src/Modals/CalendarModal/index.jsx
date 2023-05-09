import React from 'react';
import Button from '../../components/Button';
import { Calendar } from 'react-native-calendars';
import theme from '../../../theme';
import MyModal from '../Modal';

const CalendarModal = ({ modalOpen, onClose, dates, ...props }) => {
  const markedDates = {
    [dates.startDate]: {
      selected: true,
      marked: true,
      selectedColor: theme.colors.primary,
    },
    [dates.endDate]: {
      selected: true,
      marked: true,
      selectedColor: theme.colors.cancel,
    },
  };

  return (
    <MyModal animation="fade" modalOpen={modalOpen} onClose={onClose}>
      <Calendar markedDates={markedDates} {...props} />
      <Button title="Cancel" variant="primary" onPress={onClose} />
    </MyModal>
  );
};

export default CalendarModal;
