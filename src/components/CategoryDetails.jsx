/* eslint-disable no-unused-vars */
import { Text, FlatList, View, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});
const ItemSeparator = () => <View style={styles.separator} />;

const CategoryDetails = ({ expenses, category, pie, updatePie }) => {
  const editExpense = (item) => {
    console.log(item);
  };

  const removeExpense = (item) => {
    const updatedCategory = pie.expenses[category].filter(
      (expense) => expense.item !== item.item
    );

    // If this item is the final item within the category, remove category
    updatedCategory.length > 0
      ? (pie.expenses[category] = updatedCategory)
      : delete pie.expenses[category];

    updatePie(pie);
  };

  expenses?.sort((a, b) => b.cost - a.cost);
  return (
    <View style={{ alignItems: 'center' }}>
      <Text>{category}</Text>
      <FlatList
        data={expenses}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(_, i) => i}
        numColumns={4}
        renderItem={({ item }) => (
          <View>
            <Text style={{ textAlign: 'center' }}>{item.item}</Text>
            <Button onPress={() => removeExpense(item)} title="Remove" />
            <Button onPress={() => editExpense(item)} title="Edit" />
            <Text style={{ textAlign: 'center' }}>${item.cost}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CategoryDetails;
