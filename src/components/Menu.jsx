import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
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

  const selectedCurrency = (
    <Text>
      Currency <Text style={styles.selectedCurrency}>{currency}</Text>
    </Text>
  );

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
          onDismiss={toggleMenus}
          visible={currencyMenuOpen}
          currency={currency}
          setCurrency={setCurrency}
          anchor={
            <Menu.Item onPress={toggleCurrencyMenu} title={selectedCurrency} />
          }
        />
        <Divider />
        <Menu.Item
          onPress={togglePrompt}
          disabled={pies.length === 0}
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
  selectedCurrency: {
    color: 'grey',
  },
});

export default MenuComponent;
