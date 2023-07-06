import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ItemSeparator } from './Separators';
import { LegendText } from './Text';

const Legend = ({ data, listKey, currency, category, onPress }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.legendItemContainer}
      onPress={() => onPress(item.x)}
    >
      <View
        style={
          item.x !== category
            ? [styles.legendColor, { backgroundColor: item.fill }]
            : [
                styles.legendColor,
                styles.legendColorActive,
                { backgroundColor: `${item.fill}99`, borderColor: item.fill },
              ]
        }
      >
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
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendColor: {
    paddingHorizontal: 5,
    borderRadius: 50,
  },
  legendColorActive: {
    borderWidth: 4,
  },
});

export default Legend;
