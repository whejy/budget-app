import React from 'react';
import MyModal from '../../Modal';
import AddExpenseForm from './AddExpenseForm';

const AddExpense = ({
  pie,
  savePie,
  modalOpen,
  closeModal,
  remainingIncome,
  selectedCategory,
}) => {
  return (
    <MyModal animation="fade" modalOpen={modalOpen} onClose={closeModal}>
      <AddExpenseForm
        pie={pie}
        savePie={savePie}
        remainingIncome={remainingIncome}
        onClose={closeModal}
        selectedCategory={selectedCategory}
      />
    </MyModal>
  );
};

export default AddExpense;
