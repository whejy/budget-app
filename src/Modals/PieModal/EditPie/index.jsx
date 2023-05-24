import React from 'react';
import MyModal from '../../Modal';
import EditPieForm from './EditPieForm';

const EditPie = ({ modalOpen, pie, onClose }) => {
  return (
    <MyModal animation="fade" modalOpen={modalOpen} onClose={onClose}>
      <EditPieForm pie={pie} closeModal={onClose} />
    </MyModal>
  );
};

export default EditPie;
