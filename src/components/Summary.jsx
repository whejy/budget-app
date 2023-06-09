import { View, StyleSheet } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import theme from '../../theme';
import { DatesText } from './Text';

const Summary = ({ pies }) => {
  let result = { total: 0 };
  const getSummary = (pie) => {
    const { expenses } = pie;

    for (const category in expenses) {
      result = result[category] ? { ...result } : { ...result, [category]: 0 };
      expenses[category].reduce((result, curr) => {
        result[category] += curr.amount;
        result.total += curr.amount;
        return result;
      }, result);
    }
  };

  pies.forEach((pie) => getSummary(pie));

  const keys = Object.keys(result).filter((key) => key != 'total');

  let percentages = {};

  keys.forEach(
    (cat) =>
      (percentages[cat] =
        (100 * Math.round((1000 * result[cat]) / result.total)) / 1000)
  );

  let pieData = [];

  Object.keys(percentages).forEach((category) =>
    pieData.push({
      x: category,
      y: percentages[category],
      fill: theme.colors.pieData[category],
    })
  );

  pieData.sort((a, b) => a.y - b.y);

  return (
    <View style={styles.container}>
      <View style={styles.summaryHeading}>
        <DatesText>Expense Summary</DatesText>
      </View>
      <VictoryPie
        data={pieData}
        labels={({ datum }) => [datum.x, `${datum.y}%`]}
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
          },
          labels: styles.labels,
        }}
        labelComponent={<VictoryLabel textAnchor="middle" />}
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
    marginTop: 30,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  labels: {
    fontSize: 16,
    padding: 10,
    fill: theme.colors.labels,
    fontFamily: theme.fonts.secondary,
  },
  summaryHeading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default Summary;
