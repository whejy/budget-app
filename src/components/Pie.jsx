import { VictoryPie, VictoryLabel } from 'victory-native';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import CategoryDetails from './CategoryDetails';
import Dates from './Dates';
import Prompt from '../Modals/Prompt';
import theme from '../../theme';
import AddExpense from '../Modals/ExpenseModal/AddExpense';
import { PrimaryIcon, SecondaryIcon } from './Icon';
import Calendar from '../Modals/CalendarModal';

const Pie = ({
  data,
  savePie,
  removePie,
  handleNavigate,
  index,
  updateCategory,
  category,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const { expenses, income } = data;

  const toggleModal = () => setModalOpen(!modalOpen);
  const togglePrompt = () => setPromptOpen(!promptOpen);
  const toggleCalendar = () => setCalendarOpen(!calendarOpen);

  const getItemLayout = ({ height }) => {
    category === 'Income' ? (height = 40) : height;
    return handleNavigate({ height, index });
  };

  const handleDeletePie = () => {
    togglePrompt();
    removePie(data);
  };

  const handlePieUpdate = (pie) => {
    !Object.keys(expenses).includes(category) &&
      updateCategory({ index, activeCategory: '' });
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
        y: expenses[category].total,
        fill: theme.colors.pieData[category],
      });

      pieData.sort((a, b) => a.y - b.y);
    }

    const remainingIncome = pieData.reduce((acc, curr) => acc - curr.y, income);

    remainingIncome > 0 &&
      pieData.push({
        x: 'Income',
        y: remainingIncome,
        fill: theme.colors.pieData.Income,
      });

    return { pieData, remainingIncome };
  };

  const { pieData, remainingIncome } = formatPieData();

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

  // Potential code for resetting category selection between actions

  // const clearSelection = () => {
  //   setExternalMutations([
  //     {
  //       childName: `pie-${index}`,
  //       target: ['data'],
  //       eventKey: 'all',
  //       mutation: () => ({ style: undefined }),
  //       callBack: () => setExternalMutations(null),
  //     },
  //   ]);
  //   updateCategory({ index, activeCategory: '' });
  // };

  const openCalendar = () => {
    toggleCalendar();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openCalendar}>
        <Dates dates={data.dates} />
      </TouchableOpacity>
      <VictoryPie
        data={pieData}
        events={events}
        name={`pie-${index}`}
        labels={({ datum }) =>
          `${datum.x} \n$${datum.y.toLocaleString('en-US')}`
        }
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
          },
          labels: { fontSize: 16, padding: 10 },
        }}
        labelComponent={<VictoryLabel textAnchor={'middle'} />}
      />

      {category?.length > 0 ? (
        <CategoryDetails
          category={category}
          pie={data}
          savePie={handlePieUpdate}
          expenses={expenses[category]}
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
        savePie={savePie}
        pie={data}
        remainingIncome={remainingIncome}
        selectedCategory={category}
      />
      <Prompt
        modalOpen={promptOpen}
        onClose={togglePrompt}
        handleYes={handleDeletePie}
        message="Are you sure you want to delete this pie?"
      />
      <Calendar
        dates={data.dates}
        modalOpen={calendarOpen}
        onClose={toggleCalendar}
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
});

export default Pie;
