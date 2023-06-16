import { useEffect, useState, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PieStorage from '../../utils/pieStorage';
import Pie from './Pie';
import SummaryPie from './SummaryPie';
import FloatingButton from './FloatingButton';
import { Subheading } from './Text';

const ItemSeparator = () => <View style={styles.separator} />;

const PieList = ({ pies, setPies, currency, onLayoutRootView, summary }) => {
  const [activeCategories, setActiveCategories] = useState();
  const flatListRef = useRef();

  useEffect(() => {
    initialiseCategories(pies);
  }, []);

  async function setStoragePies(newPie) {
    const updatedPies = await PieStorage.setPies(newPie);
    resetNavigate();
    initialiseCategories(updatedPies);
    return setPies(updatedPies);
  }

  async function updateStoragePie(updatedPie) {
    const updatedPies = await PieStorage.updatePie(updatedPie);
    return setPies(updatedPies);
  }

  async function removePie(pie) {
    const updatedPies = await PieStorage.removePie(pie);
    resetNavigate();
    initialiseCategories(updatedPies);
    return setPies(updatedPies);
  }

  const initialiseCategories = (pies) => {
    const categories = pies.reduce((acc, curr, index) => {
      return [...acc, { index: index, activeCategory: '' }];
    }, []);
    setActiveCategories(categories);
  };

  const updateActiveCategory = ({ index, activeCategory }) => {
    const updatedCategories = activeCategories.map((pie) =>
      pie.index !== index
        ? pie
        : activeCategory === pie.activeCategory
        ? { ...pie, activeCategory: '' }
        : { ...pie, activeCategory }
    );
    setActiveCategories(updatedCategories);
  };

  const handleNavigate = ({ height, index }) => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0,
      viewOffset: 110 - height,
    });
  };

  const resetNavigate = () => {
    return handleNavigate({ height: 40, index: 0 });
  };

  const renderItem = ({ item, index }) => {
    const pie = summary ? (
      <SummaryPie
        pie={item}
        index={index}
        currency={currency}
        handleNavigate={handleNavigate}
      />
    ) : (
      <Pie
        pie={item}
        index={index}
        currency={currency}
        handleNavigate={handleNavigate}
        removePie={removePie}
        savePie={updateStoragePie}
        updateCategory={updateActiveCategory}
        category={
          activeCategories?.filter((pie) => pie.index === index)[0]
            ?.activeCategory
        }
      />
    );
    return pie;
  };

  const getSummaryData = () => {
    let expenseTotals = { total: 0 };
    let monthlyTotals = {};
    let summaryPies = [];

    const getExpenseTotals = (pie) => {
      const { expenses } = pie;

      Object.entries(expenses).forEach(([category, expenseArray]) => {
        // Initialise expenseTotals with required categories
        expenseTotals = expenseTotals[category]
          ? expenseTotals
          : { ...expenseTotals, [category]: 0 };

        // Calculate total expenses per category, and total expenses across all categories
        expenseArray.reduce((expenseTotals, expense) => {
          if (expense.date) {
            const date = new Date(expense.date);
            const month = date.getMonth();
            monthlyTotals = monthlyTotals[month]
              ? monthlyTotals
              : { ...monthlyTotals, [month]: { total: 0 } };
            monthlyTotals[month] = monthlyTotals[month][category]
              ? monthlyTotals[month]
              : { ...monthlyTotals[month], [category]: [] };

            monthlyTotals[month][category].push(expense);
            monthlyTotals[month].total += expense.amount;
          }
          //   expenseTotals[category] += expense.amount;
          //   expenseTotals.total += expense.amount;
          return expenseTotals, monthlyTotals;
        }, expenseTotals);
      });
    };

    pies.forEach((pie) => getExpenseTotals(pie));

    Object.entries(monthlyTotals).forEach(([month, expenses]) => {
      summaryPies.push({
        month: month,
        expenses: expenses,
      });
    });
    return { summaryPies, categoryDetails, expenseTotals };
  };

  const { summaryPies, categoryDetails } = getSummaryData();
  const listData = summary ? summaryPies : pies;

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
            data={listData}
            keyboardShouldPersistTaps="handled"
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item, index }) => renderItem({ item, index })}
            keyExtractor={(_, i) => i}
          />
        ) : (
          <Subheading style={styles.emptyList}>Add your first pie!</Subheading>
        )}
      </View>
      <FloatingButton setStoragePies={setStoragePies} />
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

export default PieList;
