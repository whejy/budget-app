import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Divider } from 'react-native-paper';
import theme from '../../theme';
import CurrencyMenu from './CurrencyMenu';

const MenuComponent = ({
  anchor,
  visible,
  closeMenu,
  togglePrompt,
  pies,
  currency,
  setCurrency,
}) => {
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);

  const toggleCurrencyMenu = () => setCurrencyMenuOpen(!currencyMenuOpen);

  const toggleMenus = () => {
    toggleCurrencyMenu();
    closeMenu();
  };

  const onCurrencyPress = (symbol) => {
    setCurrency(symbol);
    toggleMenus();
  };

  const eraseAll = pies.length === 0 ? true : false;

  return (
    <View style={styles.container}>
      <Menu
        contentStyle={{ backgroundColor: theme.colors.menu }}
        visible={visible}
        onDismiss={closeMenu}
        anchor={anchor}
      >
        <CurrencyMenu
          onPress={onCurrencyPress}
          onDismiss={toggleCurrencyMenu}
          visible={currencyMenuOpen}
          currency={currency}
          setCurrency={setCurrency}
          anchor={<Menu.Item onPress={toggleCurrencyMenu} title="Currency" />}
        />
        <Divider />
        <Menu.Item
          onPress={togglePrompt}
          disabled={eraseAll}
          title="Erase Data"
        />
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

export default MenuComponent;
