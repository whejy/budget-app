import { StyleSheet, View } from 'react-native';
import { Menu } from 'react-native-paper';
import theme from '../../theme';
import { currencyList } from '../data/currency';

const CurrencyMenu = ({ visible, onPress, onDismiss, anchor, currency }) => {
  const menuItems = currencyList.map((symbol) => (
    <Menu.Item
      key={symbol}
      trailingIcon={symbol === currency && 'check'}
      disabled={symbol === currency}
      onPress={() => onPress(symbol)}
      title={symbol}
    />
  ));

  return (
    <View style={styles.container}>
      <Menu
        contentStyle={styles.currencyMenu}
        visible={visible}
        onDismiss={onDismiss}
        anchor={anchor}
      >
        {menuItems}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  currencyMenu: {
    backgroundColor: theme.colors.menu,
    color: 'black',
  },
});

export default CurrencyMenu;
