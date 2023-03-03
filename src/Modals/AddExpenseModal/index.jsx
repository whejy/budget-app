import React from 'react';
import AddExpenseForm from './AddExpenseForm';
import MyModal from '../Modal';

const AddExpenseModal = ({
  modalOpen,
  onClose,
  updatePie,
  pie,
  remainingIncome,
}) => {
  return (
    <MyModal animation="fade" modalOpen={modalOpen} onClose={onClose}>
      <AddExpenseForm
        updatePie={updatePie}
        pie={pie}
        remainingIncome={remainingIncome}
        closeModal={onClose}
      />
    </MyModal>
  );
};

export default AddExpenseModal;
