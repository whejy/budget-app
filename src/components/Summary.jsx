import { useState, useRef } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import CategoryDetails from './CategoryDetails';
import { DatesText, Subheading } from './Text';
import theme from '../../theme';

const ItemSeparator = () => <View style={styles.separator} />;

const SummaryPie = ({
  pieData,
  categoryDetails,
  currency,
  handleNavigate,
  index,
}) => {
  const [category, setCategory] = useState('');

  const getItemLayout = ({ height }) => {
    return handleNavigate({ height, index });
  };

  const categoryItems = categoryDetails[category];

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
  return (
    <View style={styles.container}>
      <View style={styles.summaryHeading}>
        <DatesText>Expense</DatesText>
        <DatesText>Summary</DatesText>
      </View>
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

const Summary = ({ pies, currency }) => {
  const flatListRef = useRef();

  let expenseTotals = { total: 0 };

  const getExpenseTotals = (pie) => {
    const { expenses } = pie;

    Object.entries(expenses).forEach(([category, expenseArray]) => {
      // Initialise expenseTotals with required categories
      expenseTotals = expenseTotals[category]
        ? expenseTotals
        : { ...expenseTotals, [category]: 0 };

      // Calculate total expenses per category, and total expenses across all categories
      expenseArray.reduce((expenseTotals, expense) => {
        expenseTotals[category] += expense.amount;
        expenseTotals.total += expense.amount;
        return expenseTotals;
      }, expenseTotals);
    });
  };

  // Convert each expense total to a percentage
  const getPercentages = () => {
    let percentages = {};

    const categories = Object.keys(expenseTotals).filter(
      (key) => key !== 'total'
    );

    categories.forEach(
      (category) =>
        (percentages[category] =
          (100 *
            Math.round(
              (1000 * expenseTotals[category]) / expenseTotals.total
            )) /
          1000)
    );

    return percentages;
  };

  const getCategoryDetails = () => {
    const categoryDetails = {};
    Object.entries(expenseTotals).forEach(([category, total]) => {
      categoryDetails[category] = [{ amount: total, item: 'Total Spend' }];
    });
    return categoryDetails;
  };

  const formatPieData = () => {
    let pieData = [];

    const percentages = getPercentages();

    Object.entries(percentages).forEach(([category, percentage]) =>
      pieData.push({
        x: category,
        y: percentage,
        fill: theme.colors.pieData[category],
      })
    );

    pieData.sort((a, b) => a.y - b.y);
    return { pieData };
  };

  pies.forEach((pie) => getExpenseTotals(pie));
  const { pieData } = formatPieData();
  const categoryDetails = getCategoryDetails();

  const handleNavigate = ({ height, index }) => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0,
      viewOffset: 110 - height,
    });
  };

  return (
    <View>
      {pieData.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.pieList}
          ref={flatListRef}
          onScrollToIndexFailed={() => {
            flatListRef.current?.scrollToOffset({
              offset: 0,
              animated: true,
            });
          }}
          data={[{ pieData }]}
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item, index }) => (
            <SummaryPie
              pieData={item.pieData}
              index={index}
              categoryDetails={categoryDetails}
              currency={currency}
              handleNavigate={handleNavigate}
            />
          )}
          keyExtractor={(_, i) => i}
        />
      ) : (
        <Subheading style={styles.emptyList}>
          Add expenses to your pies to see your summary here.
        </Subheading>
      )}
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
  },
  pieList: {
    paddingBottom: 80,
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

export default Summary;
