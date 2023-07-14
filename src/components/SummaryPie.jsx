import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PieWrapper from './PieWrapper';
import CategoryDetails from './CategoryDetails';
import { roundCurrency, roundPercentage } from '../../utils/helpers';
import { DatesText } from './Text';
import { months } from '../data/months';
import theme from '../../theme';

const SummaryPie = ({ pie, currency, handleNavigate, index }) => {
  const [category, setCategory] = useState('');

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

    Object.entries(expenseTotals).forEach(([category, total]) => {
      expenseTotals[category] = roundCurrency(total);
      percentages[category] = roundPercentage(total, expenses.total);
    });

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

  const { pieData, categoryDetails } = formatPieData();
  const categoryItems = categoryDetails[category];

  return (
    <View onLayout={onLayout} style={styles.container}>
      <DatesText>{date.year}</DatesText>
      <DatesText>{date.month}</DatesText>
      <PieWrapper
        pieData={pieData}
        toggleCategory={toggleCategory}
        category={category}
        index={index}
        currency={currency}
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
