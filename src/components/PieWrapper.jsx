import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import Legend from './Legend';
import theme from '../../theme';

// Relative slice size before labels are rendered in Legend instead of on Pie
const LEGENDTHRESHOLD = 0.07;

// totalIncome prop reflects whether or not the Pie is a Summary Pie
const PieWrapper = ({
  pieData,
  toggleCategory,
  category,
  index,
  currency,
  totalIncome,
}) => {
  const [externalEventMutations, setExternalEventMutations] = useState(null);

  useEffect(() => {
    setExternalEventMutations(externalEvents);
  }, [category]);

  const minSliceThreshold = (amount, total = null) =>
    total ? amount / total > LEGENDTHRESHOLD : amount > 100 * LEGENDTHRESHOLD;

  const renderLabels = ({ datum }) => {
    if (minSliceThreshold(datum.y, totalIncome)) {
      const label = totalIncome ? `${currency}${datum.y}` : `${datum.y}%`;
      return [datum.x, label];
    }
  };

  const legendCategories = pieData.filter(
    (category) => !minSliceThreshold(category.y, totalIncome)
  );

  const sortLegend = (categories) => [
    ...categories.filter((category) => category.x === 'Income'),
    ...categories.filter((category) => category.x !== 'Income'),
  ];

  const legendData = totalIncome
    ? sortLegend(legendCategories)
    : legendCategories;

  const listKey = totalIncome ? 'C' : 'F';

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

  return (
    <>
      <Legend
        data={legendData}
        currency={currency}
        onPress={toggleCategory}
        category={category}
        listKey={listKey}
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
    </>
  );
};

const styles = StyleSheet.create({
  labels: {
    fontSize: 16,
    padding: 10,
    fill: theme.colors.labels,
    fontFamily: theme.fonts.secondary,
  },
});

export default PieWrapper;
