import { VictoryPie, VictoryTheme, VictoryLabel } from 'victory-native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import CategoryDetails from './CategoryDetails';
import FormToggle from './FormToggle';
import AddExpense from './AddExpense';
import Dates from './Dates';
import AlterPieList from './AlterPieList';

const Pie = ({ data, updatePie, removePie }) => {
  const [category, setCategory] = useState('');
  const { expenses, income } = data;

  const handleDelete = () => {
    removePie(data);
  };

  const handlePieUpdate = (pie) => {
    setCategory('');
    updatePie(pie);
  };

  let pieData = [];

  // Get total expense for each category and format data for Pie component
  for (const category in expenses) {
    expenses[category].total = expenses[category].reduce(
      (acc, curr) => acc + curr.cost,
      0
    );
    pieData.push({ x: category, y: expenses[category].total });
  }

  const remainingIncome = pieData.reduce((acc, curr) => acc - curr.y, income);

  pieData
    .sort((a, b) => b.y - a.y)
    .push({
      x: 'Income',
      y: remainingIncome,
    });

  const events = [
    {
      target: 'data',
      eventHandlers: {
        onClick: () => {
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
    <View>
      <Text style={{ textAlign: 'center' }}>
        <Dates start={data.dates.startDate} end={data.dates.endDate} />
      </Text>
      <VictoryPie
        theme={VictoryTheme.material}
        // colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
        data={pieData}
        events={events}
        labels={({ datum }) =>
          `${datum.x} \n$${datum.y.toLocaleString('en-US')}`
        }
        style={{
          labels: { fontSize: 16 },
          parent: { border: '1px solid #ccc', paddingBottom: 0 },
        }}
        labelComponent={<VictoryLabel textAnchor={'middle'} />}
      />
      <AlterPieList buttonText="Remove Pie" removePie={handleDelete} />
      {/* <Button title="Remove Pie" onPress={() => removePie(data)} /> */}
      {category?.length > 0 && (
        <CategoryDetails
          category={category}
          pie={data}
          updatePie={handlePieUpdate}
          expenses={expenses[category]}
        />
      )}
      <FormToggle buttonText={'Add Expense'}>
        <AddExpense
          updatePie={updatePie}
          pie={data}
          remainingIncome={remainingIncome}
        />
      </FormToggle>
    </View>
  );
};

export default Pie;
