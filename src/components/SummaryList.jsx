import { useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SummaryPie from './SummaryPie';
import { Subheading } from './Text';

const ItemSeparator = () => <View style={styles.separator} />;

const SummaryList = ({ pies, currency, onLayoutRootView }) => {
  const flatListRef = useRef();

  const handleNavigate = ({ height, index }) => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0,
      viewOffset: 110 - height,
    });
  };

  const getSummaryData = () => {
    let monthlyTotals = {};
    let summaryPies = [];

    const getExpenseTotals = (pie) => {
      const { expenses } = pie;

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

            monthlyTotals[year].expenses[month] = monthlyTotals[year].expenses[
              month
            ][category]
              ? monthlyTotals[year].expenses[month]
              : { ...monthlyTotals[year].expenses[month], [category]: [] };

            monthlyTotals[year].expenses[month][category].push(expense);
            monthlyTotals[year].expenses[month].total += expense.amount;
          }
        });
      });
    };

    pies.forEach((pie) => getExpenseTotals(pie));

    Object.keys(monthlyTotals).forEach((year) => {
      Object.entries(monthlyTotals[year].expenses).forEach(
        ([month, expenses]) => {
          summaryPies.push({
            month: month,
            expenses: expenses,
            year: year,
          });
        }
      );
    });
    return { summaryPies, categoryDetails };
  };

  const { summaryPies, categoryDetails } = getSummaryData();

  return (
    <>
      <View onLayout={onLayoutRootView}>
        {pies.length > 0 ? (
          <FlatList
            contentContainerStyle={styles.pieList}
            ref={flatListRef}
            onScrollToIndexFailed={() => {
              flatListRef.current?.scrollToOffset({
                offset: 0,
                animated: true,
              });
            }}
            data={summaryPies}
            keyboardShouldPersistTaps="handled"
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item, index }) => (
              <SummaryPie
                pie={item}
                index={index}
                currency={currency}
                handleNavigate={handleNavigate}
              />
            )}
            keyExtractor={(_, i) => i}
          />
        ) : (
          <Subheading style={styles.emptyList}>
            Add expenses to your pies to see a summary here.
          </Subheading>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 32,
  },
  pieList: {
    paddingTop: 30,
    paddingBottom: 80,
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