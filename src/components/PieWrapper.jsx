import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import theme from '../../theme';

const PieWrapper = ({
  pieData,
  toggleCategory,
  category,
  index,
  renderLabels,
}) => {
  const [externalEventMutations, setExternalEventMutations] = useState(null);

  useEffect(() => {
    setExternalEventMutations(externalEvents);
  }, [category]);

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
