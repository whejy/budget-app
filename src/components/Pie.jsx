/* eslint-disable no-unused-vars */
import { VictoryPie, VictoryTheme, VictoryLabel } from 'victory-native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import CategoryDetails from './CategoryDetails';

const Pie = ({ data }) => {
  const [category, setCategory] = useState('');
  const { expenses, income } = data;
  let pieData = [];

  // Get total expense for each category and format data for Pie component
  for (const category in expenses) {
    expenses[category].total = expenses[category].reduce(
      (acc, curr) => acc + curr.cost,
      0
    );
    pieData.push({ x: category, y: expenses[category].total });
  }

  // Calculate remaining income
  pieData
    .sort((a, b) => b.y - a.y)
    .push({
      x: 'Income',
      y: pieData.reduce((acc, curr) => acc - curr.y, income),
    });

  const events = [
    {
      target: 'data',
      eventHandlers: {
        onPressIn: () => {
          return [
            {
              target: 'data',
              mutation: (props) => {
                console.log(props);
                // setCategory(props.datum.x);
                setCategory(props.datum.x);
                // console.log(props.datum.x, props.datum.y);
                //   return props.text === 'clicked' ? null : { text: 'clicked' };
              },
            },
          ];
        },
      },
    },
  ];
  console.log(pieData);

  return (
    <View>
      <Text style={{ textAlign: 'center' }}>
        Week Beginning: {data.weekStart}
      </Text>
      <VictoryPie
        theme={VictoryTheme.material}
        // colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
        data={pieData}
        events={events}
        labels={({ datum }) => `${datum.x} \n$${datum.y}`}
        labelComponent={<VictoryLabel textAnchor={'middle'} />}
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
      <CategoryDetails category={category} expenses={expenses[category]} />
    </View>
  );
};

export default Pie;
