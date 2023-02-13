import { FlatList, StyleSheet, View } from 'react-native';
import Pie from './Pie';
import usePies from '../hooks/usePies';
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const PieList = () => {
  const { pies } = usePies();
  console.log(pies);
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={pies}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <Pie item={item} data={item} />}
        keyExtractor={(_, i) => i}
      />
    </View>
  );
};

export default PieList;
