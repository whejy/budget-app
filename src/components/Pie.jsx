import { VictoryPie, VictoryTheme, VictoryLabel } from 'victory-native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import CategoryDetails from './CategoryDetails';
import FormToggle from './FormToggle';

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
      },
    },
  ];

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
        style={{
          labels: { fontSize: 16 },
          parent: { border: '1px solid #ccc', paddingBottom: 0 },
        }}
        labelComponent={<VictoryLabel textAnchor={'middle'} />}
      />
      <CategoryDetails category={category} expenses={expenses[category]} />
      <FormToggle />
    </View>
  );
};

export default Pie;
