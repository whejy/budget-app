import React from 'react';
import MyModal from '../Modal';
import EditExpenseForm from './EditExpenseForm';

const EditExpenseModal = ({
  modalOpen,
  onClose,
  updateExpense,
  removeExpense,
  item,
  category,
  remainingIncome,
}) => {
  return (
    <MyModal animation="fade" modalOpen={modalOpen} onClose={onClose}>
      <EditExpenseForm
        modalOpen={modalOpen}
        closeModal={onClose}
        updateExpense={updateExpense}
        removeExpense={removeExpense}
        item={item}
        category={category}
        remainingIncome={remainingIncome}
      />
    </MyModal>
  );
};

export default EditExpenseModal;
