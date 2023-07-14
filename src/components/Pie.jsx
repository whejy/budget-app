import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PieWrapper from './PieWrapper';
import CategoryDetails from './CategoryDetails';
import Dates from './Dates';
import Prompt from '../Modals/Prompt';
import AddExpense from '../Modals/ExpenseModal/AddExpense';
import EditDates from '../Modals/EditDatesModal';
import { PrimaryIcon, SecondaryIcon } from './Icon';
import { roundCurrency } from '../../utils/helpers';
import Text from './Text';
import theme from '../../theme';

const Pie = ({ pie, savePie, removePie, handleNavigate, index, currency }) => {
  const [category, setCategory] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);
  const togglePrompt = () => setPromptOpen(!promptOpen);
  const toggleCalendar = () => setCalendarOpen(!calendarOpen);
  const toggleCategory = (newCategory) => {
    category === newCategory ? setCategory('') : setCategory(newCategory);
    !canScroll && setCanScroll(true);
  };

  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    if (canScroll) return handleNavigate({ height, index });
  };

  const handleDeletePie = () => {
    togglePrompt();
    removePie(pie);
  };

  const handlePieUpdate = (updatedPie) => {
    // Toggle active category if category no longer exists
    if (!Object.keys(expenses).includes(category) && category.length > 0) {
      setCategory('');
    }
    savePie(updatedPie);
  };

  const getRemainingIncome = ({ income, pieData }) => {
    const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);

    const remainingIncome = pieData.reduce(
      (acc, curr) => acc - curr.y,
      totalIncome
    );

    return { remainingIncome, totalIncome };
  };

  const formatPieData = () => {
    let pieData = [];

    Object.entries(expenses).forEach(([category, expenseArray]) => {
      expenseArray.total = expenseArray.reduce(
        (total, expense) => total + expense.amount,
        0
      );

      pieData.push({
        x: category,
        y: roundCurrency(expenses[category].total),
        fill: theme.colors.pieData[category],
      });
    });

    pieData.sort((a, b) => a.y - b.y);

    const { remainingIncome, totalIncome } = getRemainingIncome({
      income,
      pieData,
    });

    remainingIncome > 0 &&
      pieData.push({
        x: 'Income',
        y: roundCurrency(remainingIncome),
        fill: theme.colors.pieData.Income,
      });

    return { pieData, remainingIncome, totalIncome };
  };

  const { expenses, income } = pie;

  // Check if app is using retired data structure
  if (typeof income === 'number') {
    removePie(pie);
    return null;
  }

  const { pieData, remainingIncome, totalIncome } = formatPieData();
  const categoryItems = category === 'Income' ? income : expenses[category];
  const emptyIncomeText = 'No remaining income for this period.';

  return (
    <View key={category} onLayout={onLayout} style={styles.container}>
      <Dates dates={pie.dates} onPress={toggleCalendar} />
      <PieWrapper
        pieData={pieData}
        toggleCategory={toggleCategory}
        category={category}
        index={index}
        currency={currency}
        totalIncome={totalIncome}
      />
      {category?.length > 0 ? (
        <CategoryDetails
          category={category}
          pie={pie}
          currency={currency}
          savePie={handlePieUpdate}
          categoryItems={categoryItems}
          remainingIncome={remainingIncome}
        />
      ) : null}
      {remainingIncome === 0 && (
        <Text style={styles.emptyIncome}>{emptyIncomeText}</Text>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleModal}>
          <PrimaryIcon {...styles.button} name="edit" type="material" />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePrompt}>
          <SecondaryIcon {...styles.button} name="delete" type="material" />
        </TouchableOpacity>
      </View>
      <AddExpense
        modalOpen={modalOpen}
        closeModal={toggleModal}
        savePie={handlePieUpdate}
        pie={pie}
        remainingIncome={remainingIncome}
        selectedCategory={remainingIncome === 0 ? 'Income' : category}
      />
      <Prompt
        modalOpen={promptOpen}
        onClose={togglePrompt}
        handleYes={handleDeletePie}
        message="Delete this pie?"
      />
      <EditDates
        modalOpen={calendarOpen}
        onClose={toggleCalendar}
        pie={pie}
        savePie={savePie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    elevation: 40,
    paddingVertical: 25,
    marginHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 25,
  },
  emptyIncome: {
    textAlign: 'center',
    fontStyle: 'italic',
    paddingBottom: 20,
  },
});

export default Pie;
