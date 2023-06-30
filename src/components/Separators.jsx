import { View, StyleSheet } from 'react-native';

export const ItemSeparator = () => <View style={styles.itemSeparator} />;

export const ListSeparator = () => <View style={styles.listSeparator} />;

const styles = StyleSheet.create({
  itemSeparator: {
    height: 10,
  },
  listSeparator: {
    height: 32,
  },
});
