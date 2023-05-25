import React from 'react';
import MyModal from '../../Modal';
import EditPieForm from './EditPieForm';

const EditPie = ({
  modalOpen,
  onClose,
  savePie,
  pie,
  totalExpenses,
  ...props
}) => {
  return (
    <MyModal animation="fade" modalOpen={modalOpen} onClose={onClose}>
      <EditPieForm
        pie={pie}
        savePie={savePie}
        closeModal={onClose}
        totalExpenses={totalExpenses}
        {...props}
      />
    </MyModal>
  );
};

export default EditPie;
