import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import CategoryDetails from './CategoryDetails';
import Legend from './Legend';
import { DatesText } from './Text';
import { months } from '../data/months';
import theme from '../../theme';

const SummaryPie = ({ pie, currency, handleNavigate, index }) => {
  const [category, setCategory] = useState('');
  const [externalEventMutations, setExternalEventMutations] = useState(null);

  useEffect(() => {
    setExternalEventMutations(externalEvents);
  }, [category]);

  const { expenses, month, year } = pie;
  const date = { month: months[month], year: year };

  const toggleCategory = (newCategory) => {
    category === newCategory ? setCategory('') : setCategory(newCategory);
  };

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

  const { pieData, categoryDetails } = formatPieData();
  const categoryItems = categoryDetails[category];
  const legendCategories = pieData.filter(
    (category) => !minSliceThreshold(category.y)
  );

  return (
    <View onLayout={onLayout} style={styles.container}>
      <DatesText>{date.year}</DatesText>
      <DatesText>{date.month}</DatesText>
      <Legend
        data={legendCategories}
        category={category}
        onPress={toggleCategory}
        listKey="F"
      />
      <VictoryPie
        data={pieData}
        events={events}
        externalEventMutations={externalEventMutations}
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
