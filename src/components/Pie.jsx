import { VictoryPie, VictoryLabel } from 'victory-native';
import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import CategoryDetails from './CategoryDetails';
import Dates from './Dates';
import Prompt from '../Modals/Prompt';
import theme from '../../theme';
import AddExpenseModal from '../Modals/AddExpenseModal';

const Pie = ({ data, updatePie, removePie }) => {
  const [category, setCategory] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);

  const { expenses, income } = data;

  const toggleModal = () => setModalOpen(!modalOpen);
  const togglePrompt = () => setPromptOpen(!promptOpen);

  const handleDeletePie = () => {
    togglePrompt();
    removePie(data);
  };

  const handlePieUpdate = (pie) => {
    !Object.keys(expenses).includes(category) && setCategory('');
    updatePie(pie);
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
                setCategory(props.datum.x);
                return props.datum.x === category
                  ? setCategory(null)
                  : {
                      style: {
                        ...props.style,
                        stroke: props.style.fill,
                        fillOpacity: 0.6,
                        strokeWidth: 4,
                      },
                    };
              },
            },
          ];
        },
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Dates start={data.dates.startDate} end={data.dates.endDate} />
      <VictoryPie
        animate={{
          duration: 2000,
        }}
        data={pieData}
        events={events}
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
      {category?.length > 0 && (
        <CategoryDetails
          category={category}
          pie={data}
          updatePie={handlePieUpdate}
          expenses={expenses[category]}
          remainingIncome={remainingIncome}
        />
      )}
      <View style={styles.buttons}>
        {remainingIncome > 0 && (
          <Button title="Add Expense" onPress={toggleModal} />
        )}
        <Button title="Delete Pie" onPress={togglePrompt} />
      </View>
      <AddExpenseModal
        modalOpen={modalOpen}
        onClose={toggleModal}
        updatePie={updatePie}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Pie;
