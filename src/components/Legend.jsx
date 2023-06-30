import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ItemSeparator } from './Separators';
import { LegendText } from './Text';

const Legend = ({ data, listKey, currency, onPress }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.legendItemContainer}
      onPress={() => onPress(item.x)}
    >
      <View style={[styles.legendColor, { backgroundColor: item.fill }]}>
        <LegendText>{item.x}</LegendText>
      </View>
      <LegendText>
        {!currency ? `${item.y}%` : `${currency}${item.y}`}
      </LegendText>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      numColumns={3}
      columnWrapperStyle={styles.columnWrapperStyle}
      ItemSeparatorComponent={ItemSeparator}
      listKey={(_, index) => listKey + index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  legendItemContainer: {
    minWidth: 100,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendColor: {
    paddingHorizontal: 5,
    borderRadius: 50,
  },
});

export default Legend;
