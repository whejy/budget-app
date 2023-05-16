import { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Heading } from './Text';
import FactAlert from './Alert';
import MenuComponent from './Menu';
import theme from '../../theme';

const APPHEADER = <Heading>trackthat</Heading>;

const AppBar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => setMenuVisible(!menuVisible);

  return (
    <>
      <Appbar.Header style={styles.container}>
        <Appbar.Content title={APPHEADER} onPress={FactAlert} />
        <MenuComponent
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              color="white"
              onPress={toggleMenu}
            />
          }
          closeMenu={toggleMenu}
          visible={menuVisible}
        />
      </Appbar.Header>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.select({
    //   ios: Constants.statusBarHeight + 5,
    //   android: 5,
    // }),
    backgroundColor: theme.colors.primary,
  },
});

{
  /* <View style={styles.container}>
      <TouchableOpacity onPress={FactAlert}>
        <Heading>trackthat</Heading>
      </TouchableOpacity>
      <MenuComponent />
    </View> */
}

export default AppBar;
