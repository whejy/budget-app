import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import CategoryDetails from './CategoryDetails';
import Dates from './Dates';
import Prompt from '../Modals/Prompt';
import Calendar from '../Modals/CalendarModal';
import AddExpense from '../Modals/ExpenseModal/AddExpense';
import EditPie from '../Modals/PieModal/EditPie';
import { PrimaryIcon, SecondaryIcon } from './Icon';
import theme from '../../theme';

const Pie = ({
  data,
  savePie,
  removePie,
  handleNavigate,
  index,
  updateCategory,
  category,
  currency,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { expenses, income } = data;

  const toggleModal = () => setModalOpen(!modalOpen);
  const togglePrompt = () => setPromptOpen(!promptOpen);
  const toggleCalendar = () => setCalendarOpen(!calendarOpen);
  const toggleEdit = () => setEditModalOpen(!editModalOpen);

  const handleDeletePie = () => {
    togglePrompt();
    removePie(data);
  };

  const handlePieUpdate = (pie) => {
    if (!Object.keys(expenses).includes(category)) {
      updateCategory({ index, activeCategory: '' });
    }
    savePie(pie);
  };

  const formatPieData = () => {
    let pieData = [];

    for (const category in expenses) {
      expenses[category].total = expenses[category].reduce(
        (acc, curr) => acc + curr.cost,
        0
      );

      pieData.push({
        x: category,
        y: Math.round(100 * expenses[category].total) / 100,
        fill: theme.colors.pieData[category],
      });

      pieData.sort((a, b) => a.y - b.y);
    }

    const remainingIncome = pieData.reduce((acc, curr) => acc - curr.y, income);

    remainingIncome > 0 &&
      pieData.push({
        x: 'Income',
        y: Math.round(remainingIncome * 100) / 100,
        fill: theme.colors.pieData.Income,
      });

    return { pieData, remainingIncome };
  };

  const { pieData, remainingIncome } = formatPieData();
  const totalExpenses = data.income - remainingIncome;

  const events = [
    {
      target: 'data',
      eventHandlers: {
        onPressIn: () => {
          return [
            {
              eventKey: 'all',
              mutation: () => null,
            },

            {
              mutation: (props) => {
                updateCategory({ index, activeCategory: props.datum.x });
                if (props.datum.x !== category) {
                  return {
                    style: {
                      ...props.style,
                      stroke: props.style.fill,
                      fillOpacity: 0.6,
                      strokeWidth: 4,
                    },
                  };
                }
              },
            },
          ];
        },
      },
    },
  ];

  const getItemLayout = ({ height }) => {
    return handleNavigate({ height, index });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleEdit}>
        <Dates dates={data.dates} />
      </TouchableOpacity>
      <VictoryPie
        data={pieData}
        events={events}
        labels={({ datum }) => [datum.x, `${currency}${datum.y}`]}
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
          },
          labels: styles.labels,
        }}
        labelComponent={<VictoryLabel textAnchor="middle" />}
      />

      {category?.length > 0 ? (
        <CategoryDetails
          category={category}
          pie={data}
          currency={currency}
          savePie={handlePieUpdate}
          expenses={expenses[category]}
          totalExpenses={totalExpenses}
          remainingIncome={remainingIncome}
          getItemLayout={getItemLayout}
        />
      ) : null}
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
        onClose={toggleModal}
        savePie={handlePieUpdate}
        pie={data}
        remainingIncome={remainingIncome}
        selectedCategory={category}
      />
      <EditPie
        modalOpen={editModalOpen}
        onClose={toggleEdit}
        pie={data}
        savePie={savePie}
        totalExpenses={totalExpenses}
        dates
      />
      <Prompt
        modalOpen={promptOpen}
        onClose={togglePrompt}
        handleYes={handleDeletePie}
        message="Delete this pie?"
      />
      <Calendar
        dates={data.dates}
        modalOpen={calendarOpen}
        onClose={toggleCalendar}
        initialDate={data.dates.startDate}
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
  labels: {
    fontSize: 16,
    padding: 10,
    fill: theme.colors.labels,
    fontFamily: theme.fonts.secondary,
  },
  pieSettings: {
    padding: 10,
  },
  button: {
    paddingHorizontal: 25,
  },
});

export default Pie;
