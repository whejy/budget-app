import { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Heading } from './Text';
import FactAlert from './Alert';
import Prompt from '../Modals/Prompt';
import MenuComponent from './Menu';
import theme from '../../theme';

const APPHEADER = <Heading>trackthat</Heading>;

const AppBar = ({ pies, removeAllPies, currency, setCurrency }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const togglePrompt = () => setPromptOpen(!promptOpen);

  const handleDeleteAll = () => {
    togglePrompt();
    toggleMenu();
    removeAllPies();
  };

  const handleCancel = () => {
    togglePrompt();
    toggleMenu();
  };

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
          pies={pies}
          currency={currency}
          setCurrency={setCurrency}
          togglePrompt={togglePrompt}
          closeMenu={toggleMenu}
          visible={menuOpen}
        />
      </Appbar.Header>
      <Prompt
        modalOpen={promptOpen}
        onClose={handleCancel}
        handleYes={handleDeleteAll}
        message="Are you sure you want to delete all of your pie data?"
      />
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
