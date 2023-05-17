import { StyleSheet, View } from 'react-native';
import { Menu } from 'react-native-paper';
import theme from '../../theme';
import { currencyList } from '../data/currency';

const CurrencyMenu = ({ visible, onPress, onDismiss, anchor }) => {
  return (
    <View style={styles.container}>
      <Menu
        contentStyle={{ backgroundColor: theme.colors.menu }}
        visible={visible}
        onDismiss={onDismiss}
        anchor={anchor}
      >
        {currencyList.map((symbol) => (
          <Menu.Item
            key={symbol}
            onPress={() => onPress(symbol)}
            title={symbol}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default CurrencyMenu;
