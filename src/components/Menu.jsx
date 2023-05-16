import { View, StyleSheet } from 'react-native';
import { Menu, Divider } from 'react-native-paper';
import theme from '../../theme';

const MenuComponent = ({ anchor, visible, closeMenu, togglePrompt, pies }) => {
  const eraseAll = pies.length === 0 ? true : false;

  return (
    <View style={styles.container}>
      <Menu
        contentStyle={{ backgroundColor: theme.colors.menu }}
        visible={visible}
        onDismiss={closeMenu}
        anchor={anchor}
      >
        <Menu.Item onPress={() => {}} title="Currency" />
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
