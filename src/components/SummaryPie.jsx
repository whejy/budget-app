import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import CategoryDetails from './CategoryDetails';
import { DatesText } from './Text';
import { months } from '../data/months';
import theme from '../../theme';

const SummaryPie = ({ pie, currency, handleNavigate, index }) => {
  const [category, setCategory] = useState('');

  const { expenses, month } = pie;
  const date = months[month];

  const getItemLayout = ({ height }) => {
    return handleNavigate({ height, index });
  };

  const getCategoryDetails = (expenseTotals) => {
    const categoryDetails = {};
    Object.entries(expenseTotals).forEach(([category, total]) => {
      categoryDetails[category] = [{ amount: total, item: 'Total Spend' }];
    });
    return categoryDetails;
  };

  // Convert each expense total to a percentage
  const getPercentages = () => {
    let expenseTotals = {};
    let percentages = {};

    const categories = Object.keys(expenses).filter((key) => key !== 'total');

    categories.forEach((category) => {
      expenseTotals = expenseTotals[category]
        ? expenseTotals
        : { ...expenseTotals, [category]: 0 };
      Object.values(expenses[category]).forEach(
        (expense) => (expenseTotals[category] += expense.amount)
      );
    });

    Object.entries(expenseTotals).forEach(
      ([category, total]) =>
        (percentages[category] =
          (100 * Math.round((1000 * total) / expenses.total)) / 1000)
    );

    return { percentages, expenseTotals };
  };

  const formatPieData = () => {
    let pieData = [];

    const { percentages, expenseTotals } = getPercentages();
    const categoryDetails = getCategoryDetails(expenseTotals);

    Object.entries(percentages).forEach(([category, percentage]) =>
      pieData.push({
        x: category,
        y: percentage,
        fill: theme.colors.pieData[category],
      })
    );

    pieData.sort((a, b) => a.y - b.y);
    return { pieData, categoryDetails };
  };

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
                if (props.datum.x !== category) {
                  return {
                    style: {
                      ...props.style,
                      stroke: props.style.fill,
                      fillOpacity: 0.6,
                      strokeWidth: 4,
                    },
                  };
                }
                setCategory('');
              },
            },
          ];
        },
      },
    },
  ];

  const { pieData, categoryDetails } = formatPieData();
  const categoryItems = categoryDetails[category];

  return (
    <View style={styles.container}>
      <DatesText></DatesText>
      <DatesText>{date}</DatesText>
      <VictoryPie
        data={pieData}
        labels={({ datum }) => [datum.x, `${datum.y}%`]}
        events={events}
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
          },
          labels: styles.labels,
        }}
        labelComponent={<VictoryLabel textAnchor="middle" />}
      />
      {category?.length > 0 ? (
        <CategoryDetails
          category={category}
          getItemLayout={getItemLayout}
          categoryItems={categoryItems}
          currency={currency}
          summary
        />
      ) : null}
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
  emptyList: {
    textAlign: 'center',
    fontStyle: 'italic',
    position: 'absolute',
    left: 50,
    right: 50,
    top: 240,
  },
});

export default SummaryPie;
