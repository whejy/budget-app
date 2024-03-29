import { useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SummaryPie from './SummaryPie';
import { ListSeparator } from './Separators';
import { isEmpty } from '../../utils/helpers';
import { Subheading } from './Text';

const SummaryList = ({ pies, currency, onLayoutRootView }) => {
  const flatListRef = useRef();

  const handleNavigate = ({ height, index }) => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0,
      viewOffset: 600 - height,
    });
  };

  const getSummaryData = () => {
    const getMonthlyTotals = () => {
      let monthlyTotals = {};

      const calculateTotals = (pie) => {
        const { expenses } = pie;

        if (isEmpty(expenses)) return;

        Object.entries(expenses).forEach(([category, expenseArray]) => {
          expenseArray.forEach((expense) => {
            if (expense.date) {
              const date = new Date(expense.date);
              const month = date.getMonth();
              const year = date.getFullYear();

              monthlyTotals = monthlyTotals[year]
                ? monthlyTotals
                : { ...monthlyTotals, [year]: { expenses: {} } };

              monthlyTotals[year].expenses = monthlyTotals[year].expenses[month]
                ? monthlyTotals[year].expenses
                : { ...monthlyTotals[year].expenses, [month]: { total: 0 } };

              monthlyTotals[year].expenses[month] = monthlyTotals[year]
                .expenses[month][category]
                ? monthlyTotals[year].expenses[month]
                : { ...monthlyTotals[year].expenses[month], [category]: [] };

              monthlyTotals[year].expenses[month][category].push(expense);
              monthlyTotals[year].expenses[month].total += expense.amount;
            }
          });
        });
      };
      pies.forEach((pie) => calculateTotals(pie));
      return { monthlyTotals };
    };

    const getSummaryData = (monthlyTotals) => {
      let summaryData = [];

      if (isEmpty(monthlyTotals)) {
        summaryData = null;
      } else {
        Object.keys(monthlyTotals).forEach((year) => {
          Object.entries(monthlyTotals[year].expenses).forEach(
            ([month, expenses]) => {
              summaryData.push({
                expenses,
                month,
                year,
              });
            }
          );
        });
      }

      return { summaryData };
    };

    const mostRecentSort = (pies) => {
      pies.sort((a, b) => b.month - a.month);
      pies.sort((a, b) => b.year - a.year);
      return pies;
    };

    const { monthlyTotals } = getMonthlyTotals();
    const { summaryData } = getSummaryData(monthlyTotals);
    const summaryPies = summaryData ? mostRecentSort(summaryData) : null;

    return { summaryPies };
  };

  const { summaryPies } = getSummaryData();

  const renderItem = ({ item, index }) => (
    <SummaryPie
      pie={item}
      index={index}
      currency={currency}
      handleNavigate={handleNavigate}
    />
  );

  return (
    <>
      <View style={styles.container} onLayout={onLayoutRootView}>
        {summaryPies ? (
          <FlatList
            ref={flatListRef}
            data={summaryPies}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.pieList}
            ItemSeparatorComponent={ListSeparator}
            keyExtractor={(_, i) => i}
            onScrollToIndexFailed={() => {
              flatListRef.current?.scrollToOffset({
                offset: 0,
                animated: true,
              });
            }}
          />
        ) : (
          <Subheading style={styles.emptyList}>
            Add expenses to your pies to see your monthly summary here.
          </Subheading>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pieList: {
    paddingVertical: 20,
    flexGrow: 1,
  },
  emptyList: {
    textAlign: 'center',
    fontStyle: 'italic',
    position: 'absolute',
    left: 50,
    right: 50,
    top: 250,
  },
});

export default SummaryList;
