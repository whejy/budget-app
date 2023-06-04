import React from 'react';
import MyModal from '../Modal';
import EditDatesForm from './EditDatesForm';

const EditDates = ({ modalOpen, onClose, pie, savePie }) => {
  return (
    <MyModal animation="fade" modalOpen={modalOpen} onClose={onClose}>
      <EditDatesForm savePie={savePie} pie={pie} closeModal={onClose} />
    </MyModal>
  );
};

export default EditDates;
