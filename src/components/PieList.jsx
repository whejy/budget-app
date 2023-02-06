import { FlatList, StyleSheet, View } from 'react-native';
import Pie from './Pie';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const data = [
  {
    weekStart: '13-11-2001',
    income: 1500,
    expenses: [
      { item: 'Makeup', x: 'Shopping', y: 150 },
      { item: 'Nothing', x: 'Shopping', y: 20 },
      { item: 'Test', x: 'Shopping', y: 50 },
      { item: 'Electricity', x: 'Bills', y: 400 },
      { item: 'Something else...', x: 'Extra', y: 40 },
    ],
  },
  {
    weekStart: '13-11-2001',
    income: 1500,
    expenses: [
      { item: 'Groceries', x: 'Shopping', y: 250 },
      { item: 'Gas', x: 'Bills', y: 200 },
      { item: 'Hmmm', x: 'Extra', y: 40 },
    ],
  },
  {
    weekStart: '13-11-2001',
    income: 1500,
    expenses: [
      { item: 'Makeup', x: 'Shopping', y: 150 },
      { item: 'Nothing', x: 'Shopping', y: 20 },
      { item: 'Test', x: 'Shopping', y: 50 },
      { item: 'Electricity', x: 'Bills', y: 400 },
      { item: 'Something else...', x: 'Extra', y: 40 },
    ],
  },
  {
    weekStart: '13-11-2001',
    income: 1500,
    expenses: [
      { item: 'Makeup', x: 'Shopping', y: 150 },
      { item: 'Nothing', x: 'Shopping', y: 20 },
      { item: 'Test', x: 'Shopping', y: 50 },
      { item: 'Electricity', x: 'Bills', y: 400 },
      { item: 'Something else...', x: 'Extra', y: 40 },
    ],
  },
];

const ItemSeparator = () => <View style={styles.separator} />;

const PieList = () => {
  return (
    <View>
      <FlatList
        data={data}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <Pie item={item} data={item} />}
        keyExtractor={(_, i) => i}
      />
    </View>
  );
};

export default PieList;
