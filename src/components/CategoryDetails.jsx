/* eslint-disable no-unused-vars */
import { Text, FlatList, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});
const ItemSeparator = () => <View style={styles.separator} />;

const CategoryDetails = ({ expenses, category }) => {
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
            <Text style={{ textAlign: 'center' }}>${item.cost}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CategoryDetails;
