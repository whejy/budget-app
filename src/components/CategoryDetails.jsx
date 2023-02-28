import {
  Text,
  FlatList,
  View,
  StyleSheet,
  Button,
  Pressable,
} from 'react-native';
import { Subheading } from './Text';

const ItemSeparator = () => <View style={styles.separator} />;

const CategoryDetails = ({ expenses, category, pie, updatePie }) => {
  const editExpense = (item) => {
    console.log(item);
  };

  const removeCategory = () => {
    delete pie.expenses[category];
    updatePie(pie);
  };

  const removeExpense = (expenseToRemove) => {
    const updatedCategory = pie.expenses[category].filter(
      (expense) => expense.id !== expenseToRemove.id
    );

    // If this item is the final item within the category, remove category
    updatedCategory.length > 0
      ? (pie.expenses[category] = updatedCategory)
      : delete pie.expenses[category];

    updatePie(pie);
  };

  expenses?.sort((a, b) => b.cost - a.cost);
  return (
    <View style={styles.container}>
      {expenses ? (
        <>
          <View style={styles.categoryTitleContainer}>
            <Text style={styles.hidden}>X</Text>
            <Subheading style={styles.categoryTitle}>{category}</Subheading>
            <Pressable onPress={() => removeCategory()}>
              <Text style={styles.delete}>X</Text>
            </Pressable>
            {/* <Button title="Delete Category" onPress={() => removeCategory()} /> */}
          </View>
          <FlatList
            data={expenses}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={(_, i) => i}
            numColumns={4}
            renderItem={({ item }) => (
              <View>
                <Text style={{ textAlign: 'center' }}>{item.item}</Text>
                <Button onPress={() => removeExpense(item)} title="Delete" />
                <Button onPress={() => editExpense(item)} title="Edit" />
                <Text style={{ textAlign: 'center' }}>
                  ${item.cost.toLocaleString('en-US')}
                </Text>
              </View>
            )}
          />
        </>
      ) : (
        <Text>
          You started this period with ${pie.income.toLocaleString('en-US')}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hidden: {
    opacity: 0,
    height: 0,
  },
  categoryTitle: { paddingHorizontal: 10 },
  delete: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'red',
  },
});

export default CategoryDetails;
