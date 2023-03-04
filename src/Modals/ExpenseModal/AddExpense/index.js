import React from 'react';
import MyModal from '../../Modal';
import AddExpenseForm from './AddExpenseForm';

const AddExpense = ({
  modalOpen,
  onClose,
  updatePie,
  pie,
  remainingIncome,
  selectedCategory,
}) => {
  return (
    <MyModal animation="fade" modalOpen={modalOpen} onClose={onClose}>
      <AddExpenseForm
        updatePie={updatePie}
        pie={pie}
        remainingIncome={remainingIncome}
        closeModal={onClose}
        selectedCategory={selectedCategory}
      />
    </MyModal>
  );
};

export default AddExpense;
