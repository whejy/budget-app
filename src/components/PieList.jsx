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
    expenses: {
      Shopping: [
        { item: 'Makeup', cost: 150 },
        { item: 'Nothing', cost: 20 },
        { item: 'Test', cost: 50 },
      ],
      Bills: [
        { item: 'Electricity', cost: 400 },
        { item: 'Gas', cost: 220 },
      ],
      Extra: [{ item: 'Something else...', cost: 40 }],
    },
  },
  {
    weekStart: '12-11-1990',
    income: 1500,
    expenses: {
      Shopping: [{ item: 'Handbag', cost: 150 }],
      Bills: [
        { item: 'Electricity', cost: 400 },
        { item: 'Gas', cost: 220 },
      ],
      Other: [{ item: 'Something else...', cost: 400 }],
    },
  },
];

const ItemSeparator = () => <View style={styles.separator} />;

const PieList = () => {
  return (
    <View style={{ padding: 10 }}>
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
