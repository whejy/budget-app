/* eslint-disable no-unused-vars */
import { VictoryPie, VictoryTheme, VictoryLabel } from 'victory-native';
import React from 'react';
import { Text, Touchable, View, Pressable } from 'react-native';

const Pie = ({ data }) => {
  const events = [
    {
      target: 'data',
      eventHandlers: {
        onPress: () => {
          return [
            {
              target: 'data',
              mutation: (props) => {
                // setCategory(props.datum.x);
                console.log(props.datum.x, props.datum.y);
                //   return props.text === 'clicked' ? null : { text: 'clicked' };
              },
            },
          ];
        },
      },
    },
  ];

  //   Sort by category
  const categories = Object.values(
    data.expenses.reduce(
      (acc, curr) => ((acc[curr.x] = acc[curr.x] || []).push(curr), acc),
      {}
    )
  );

  //   Generate total expense for each category
  categories.map(
    (categoryGroup) =>
      (categoryGroup.total = {
        x: categoryGroup[0].x,
        y: categoryGroup.reduce((acc, curr) => {
          return acc + curr.y;
        }, 0),
      })
  );

  console.log(categories);

  //   Calculate remaining income after expenses
  const remIncome = data.expenses.reduce(
    (acc, curr) => acc - curr['y'],
    data.income
  );

  const finalData = categories.map((category) => category.total);

  finalData.push({
    x: 'Remaining Income',
    y: remIncome,
  });

  return (
    <VictoryPie
      theme={VictoryTheme.material}
      data={finalData}
      events={events}
      labels={({ datum }) => `${datum.x}: $${datum.y}`}
      // labelComponent={
      //   <Text>
      //     <VictoryLabel
      //       textAnchor={({ text }) => (text[0].length > 14 ? 'start' : 'end')}
      //       style={{
      //         labels: { fontSize: 12 },
      //         parent: { border: '1px solid #ccc' },
      //       }}
      //     />
      //   </Text>
      // }
    />
  );
};

export default Pie;
