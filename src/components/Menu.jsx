import { View, StyleSheet } from 'react-native';
import { Menu, Divider } from 'react-native-paper';
import theme from '../../theme';

const MenuComponent = ({ anchor, visible, closeMenu }) => {
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
        <Menu.Item onPress={() => {}} title="Erase Data" />
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
