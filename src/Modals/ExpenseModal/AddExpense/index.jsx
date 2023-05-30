import React, { useState, useEffect } from 'react';
import MyModal from '../../Modal';
import AddExpenseForm from './AddExpenseForm';
import AddIncomeForm from './AddIncomeForm';

const AddExpense = ({
  pie,
  savePie,
  modalOpen,
  closeModal,
  remainingIncome,
  selectedCategory,
}) => {
  const [formCategory, setFormCategory] = useState('');

  useEffect(() => {
    setFormCategory(selectedCategory);
  }, [selectedCategory]);

  const onClose = () => {
    setFormCategory('');
    closeModal();
  };

  return (
    <MyModal animation="fade" modalOpen={modalOpen} onClose={onClose}>
      {formCategory === 'Income' ||
      (formCategory === 'Income' && selectedCategory === 'Income') ? (
        <AddIncomeForm
          pie={pie}
          savePie={savePie}
          onClose={onClose}
          formCategory={formCategory}
          setFormCategory={setFormCategory}
        />
      ) : (
        <AddExpenseForm
          pie={pie}
          savePie={savePie}
          remainingIncome={remainingIncome}
          onClose={onClose}
          selectedCategory={selectedCategory}
          formCategory={formCategory}
          setFormCategory={setFormCategory}
        />
      )}
    </MyModal>
  );
};

export default AddExpense;
