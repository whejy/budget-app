import { Text, FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Subheading } from './Text';

const ItemSeparator = () => <View style={styles.separator} />;

const CategoryDetails = ({ expenses, category, pie, updatePie }) => {
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
          <View style={styles.categoryContainer}>
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
            columnWrapperStyle={styles.itemContainer}
            renderItem={({ item }) => (
              <Pressable
                style={styles.itemDetails}
                onPress={() => removeExpense(item)}
              >
                <Text style={{ textAlign: 'center' }}>{item.item}</Text>
                <Text>${item.cost.toLocaleString('en-US')}</Text>
              </Pressable>
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
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemContainer: {
    paddingBottom: 10,
  },
  itemDetails: {
    width: 80,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hidden: {
    opacity: 0,
    height: 0,
  },
  categoryTitle: {
    paddingHorizontal: 10,
  },
  delete: {
    fontSize: 22,
    color: 'red',
  },
});

export default CategoryDetails;
