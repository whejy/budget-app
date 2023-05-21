import { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Heading } from './Text';
import FactAlert from './Alert';
import Prompt from '../Modals/Prompt';
import MenuComponent from './Menu';
import theme from '../../theme';

const APPHEADER = <Heading>trackthat</Heading>;

const AppBar = ({ pies, removeAllPies, currency, setCurrency }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [canGetFact, setCanGetFact] = useState(true);

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

  // Get random fact, ensure cannot request multiple times
  const getFact = () => {
    if (canGetFact) {
      FactAlert();
      setCanGetFact(false);
    }
    setTimeout(() => {
      setCanGetFact(true);
    }, 2000);
  };

  const title = (
    <TouchableOpacity style={styles.header} onPress={getFact}>
      {APPHEADER}
    </TouchableOpacity>
  );

  return (
    <>
      <Appbar.Header mode="small" style={styles.container}>
        <Appbar.Content title={title} />
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
        message="Delete all of your pie data?"
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
  header: {
    alignSelf: 'flex-start',
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
