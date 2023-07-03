import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import CategoryDetails from './CategoryDetails';
import Legend from './Legend';
import { DatesText } from './Text';
import { months } from '../data/months';
import theme from '../../theme';

const SummaryPie = ({ pie, currency, handleNavigate, index }) => {
  const [category, setCategory] = useState('');

  const { expenses, month, year } = pie;
  const date = { month: months[month], year: year };

  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    return handleNavigate({ height, index });
  };

  const getCategoryDetails = (expenseTotals) => {
    const categoryDetails = {};
    Object.entries(expenseTotals).forEach(([category, total]) => {
      categoryDetails[category] = [{ amount: total, item: null }];
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

  const minSliceThreshold = (amount) => amount > 7;

  const renderLabels = ({ datum }) => {
    if (minSliceThreshold(datum.y)) {
      return [datum.x, `${datum.y}%`];
    }
  };

  const toggleCategory = (legendCategory) => {
    category === legendCategory ? setCategory('') : setCategory(legendCategory);
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
  const legendCategories = pieData.filter(
    (category) => !minSliceThreshold(category.y)
  );

  return (
    <View onLayout={onLayout} style={styles.container}>
      <DatesText>{date.year}</DatesText>
      <DatesText>{date.month}</DatesText>
      <Legend data={legendCategories} onPress={toggleCategory} listKey="F" />
      <VictoryPie
        data={pieData}
        events={events}
        labels={renderLabels}
        labelComponent={<VictoryLabel textAnchor="middle" />}
        innerRadius={70}
        padAngle={1}
        padding={60}
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
          },
          labels: styles.labels,
        }}
      />
      {category?.length > 0 ? (
        <CategoryDetails
          category={category}
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
