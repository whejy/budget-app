import React from 'react';
import MyModal from '../../Modal';
import EditExpenseForm from './EditExpenseForm';

const EditExpense = ({
  modalOpen,
  onClose,
  item,
  pie,
  category,
  remainingIncome,
  savePie,
}) => {
  return (
    <MyModal animation="fade" modalOpen={modalOpen} onClose={onClose}>
      <EditExpenseForm
        modalOpen={modalOpen}
        closeModal={onClose}
        item={item}
        initialCategory={category}
        initialPie={pie}
        remainingIncome={remainingIncome}
        savePie={savePie}
      />
    </MyModal>
  );
};

export default EditExpense;
