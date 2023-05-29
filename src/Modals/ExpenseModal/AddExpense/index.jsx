import React from 'react';
import MyModal from '../../Modal';
import AddExpenseForm from './AddExpenseForm';

const AddExpense = ({
  modalOpen,
  onClose,
  savePie,
  pie,
  remainingIncome,
  selectedCategory,
}) => {
  return (
    <MyModal animation="fade" modalOpen={modalOpen} onClose={onClose}>
      <AddExpenseForm
        savePie={savePie}
        pie={pie}
        remainingIncome={remainingIncome}
        closeModal={onClose}
        selectedCategory={selectedCategory}
      />
    </MyModal>
  );
};

export default AddExpense;
