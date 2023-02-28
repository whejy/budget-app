import { VictoryPie, VictoryLabel } from 'victory-native';
import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CategoryDetails from './CategoryDetails';
import Dates from './Dates';
import AlterPies from './AlterPies';
import theme from '../../theme';

const Pie = ({ data, updatePie, removePie }) => {
  const [category, setCategory] = useState('');
  const { expenses, income } = data;

  const handlePieUpdate = (pie) => {
    !Object.keys(expenses).includes(category) && setCategory('');
    updatePie(pie);
  };

  const handleDelete = () => {
    removePie(data);
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
          labels: { fontSize: 16 },
          parent: {
            border: '1px solid #ccc',
            paddingBottom: 0,
          },
        }}
        labelComponent={<VictoryLabel textAnchor={'middle'} />}
      />
      <View style={styles.buttons}>
        <AlterPies buttonText="Delete Pie" removePie={handleDelete} />
        <AlterPies
          buttonText="Add Expense"
          updatePie={updatePie}
          pie={data}
          remainingIncome={remainingIncome}
        />
      </View>
      {category?.length > 0 && (
        <CategoryDetails
          category={category}
          pie={data}
          updatePie={handlePieUpdate}
          expenses={expenses[category]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Pie;
