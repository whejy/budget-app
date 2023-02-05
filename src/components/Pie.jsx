import { VictoryPie, VictoryTheme } from 'victory';
import React from 'react';

const events = [
  {
    target: 'data',
    eventHandlers: {
      onClick: () => {
        return [
          {
            target: 'labels',
            mutation: (props) => {
              console.log(props.text);
              //   return props.text === 'clicked' ? null : { text: 'clicked' };
            },
          },
        ];
      },
    },
  },
];

const Pie = ({ data }) => {
  return (
    <VictoryPie theme={VictoryTheme.material} data={data} events={events} />
  );
};

export default Pie;
