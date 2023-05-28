import React, { useState, useEffect } from 'react';
import MyModal from '../../Modal';
import AddExpenseForm from './AddExpenseForm';
import AddIncomeForm from './AddIncomeForm';

const AddExpense = ({
  modalOpen,
  onClose,
  savePie,
  pie,
  remainingIncome,
  selectedCategory,
}) => {
  const [dropdownCategory, setDropdownCategory] = useState('');

  useEffect(() => {
    setDropdownCategory('');
  }, [onClose]);

  return (
    <MyModal animation="fade" modalOpen={modalOpen} onClose={onClose}>
      {dropdownCategory === 'Income' ? (
        <AddIncomeForm
          savePie={savePie}
          pie={pie}
          remainingIncome={remainingIncome}
          closeModal={onClose}
          selectedCategory={selectedCategory}
          dropdownCategory={dropdownCategory}
          setDropdownCategory={setDropdownCategory}
        />
      ) : (
        <AddExpenseForm
          savePie={savePie}
          pie={pie}
          remainingIncome={remainingIncome}
          closeModal={onClose}
          selectedCategory={selectedCategory}
          dropdownCategory={dropdownCategory}
          setDropdownCategory={setDropdownCategory}
        />
      )}
    </MyModal>
  );
};

export default AddExpense;
