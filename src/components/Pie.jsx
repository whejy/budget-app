import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import CategoryDetails from './CategoryDetails';
import Dates from './Dates';
import Legend from './Legend';
import Prompt from '../Modals/Prompt';
import AddExpense from '../Modals/ExpenseModal/AddExpense';
import EditDates from '../Modals/EditDatesModal';
import { PrimaryIcon, SecondaryIcon } from './Icon';
import Text from './Text';
import theme from '../../theme';

const Pie = ({ pie, savePie, removePie, handleNavigate, index, currency }) => {
  const [category, setCategory] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const [externalEventMutations, setExternalEventMutations] = useState(null);

  useEffect(() => {
    setExternalEventMutations(externalEvents);
  }, [category]);

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
        y: Math.round(100 * expenses[category].total) / 100,
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
        y: Math.round(100 * remainingIncome) / 100,
        fill: theme.colors.pieData.Income,
      });

    return { pieData, remainingIncome, totalIncome };
  };

  const minSliceThreshold = (amount, total) => amount / total > 0.07;

  const renderLabels = ({ datum }) => {
    if (minSliceThreshold(datum.y, totalIncome)) {
      return [datum.x, `${currency}${datum.y}`];
    }
  };

  const sortLegend = (categories) => [
    ...categories.filter((category) => category.x === 'Income'),
    ...categories.filter((category) => category.x !== 'Income'),
  ];

  const events = [
    {
      target: 'data',
      eventHandlers: {
        onPressIn: () => {
          return [
            {
              mutation: (props) => {
                toggleCategory(props.datum.x);
              },
            },
          ];
        },
      },
    },
  ];

  const externalEvents = [
    {
      childname: `pie${index}`,
      target: 'data',
      eventKey: 'all',
      mutation: (props) =>
        props.datum.x === category
          ? {
              style: {
                ...props.style,
                stroke: props.style.fill,
                fillOpacity: 0.6,
                strokeWidth: 4,
              },
            }
          : {
              style: {
                ...props.style,
                stroke: props.style.fill,
                fillOpacity: 1,
                strokeWidth: 1,
              },
            },
      callback: setExternalEventMutations,
    },
  ];

  const { expenses, income } = pie;

  // Check if app is using retired data structure
  if (typeof income === 'number') {
    removePie(pie);
    return null;
  }

  const { pieData, remainingIncome, totalIncome } = formatPieData();
  const categoryItems = category === 'Income' ? income : expenses[category];
  const emptyIncomeText = 'No remaining income for this period.';
  const legendCategories = pieData.filter(
    (category) => !minSliceThreshold(category.y, totalIncome)
  );
  const sortedLegend = sortLegend(legendCategories);

  return (
    <View onLayout={onLayout} style={styles.container}>
      <Dates dates={pie.dates} onPress={toggleCalendar} />
      <Legend
        data={sortedLegend}
        currency={currency}
        onPress={toggleCategory}
        category={category}
        listKey="C"
      />
      <VictoryPie
        data={pieData}
        events={events}
        externalEventMutations={externalEventMutations}
        name={`pie${index}`}
        labels={renderLabels}
        labelComponent={<VictoryLabel textAnchor="middle" />}
        innerRadius={70}
        padding={60}
        padAngle={1}
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
          },
          labels: styles.labels,
        }}
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
        {remainingIncome > 0 && (
          <TouchableOpacity onPress={toggleModal}>
            <PrimaryIcon {...styles.button} name="edit" type="material" />
          </TouchableOpacity>
        )}
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
        selectedCategory={category}
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
  labels: {
    padding: 10,
    fontSize: theme.fontSizes.labels,
    fontFamily: theme.fonts.secondary,
    fill: theme.colors.labels,
  },
  emptyIncome: {
    textAlign: 'center',
    fontStyle: 'italic',
    paddingBottom: 10,
  },
});

export default Pie;
