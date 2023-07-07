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
            ? [styles.legendItem, { backgroundColor: item.fill }]
            : [
                styles.legendItem,
                {
                  backgroundColor: `${item.fill}99`,
                  borderColor: item.fill,
                  borderWidth: 4,
                },
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
      style={styles.container}
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
  container: {
    marginTop: 15,
  },
  legendItemContainer: {
    minWidth: 100,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendItem: {
    paddingHorizontal: 5,
    borderRadius: 50,
  },
});

export default Legend;
