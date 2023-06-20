import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import Prompt from '../Modals/Prompt';
import MenuComponent from './Menu';
import FactAlert from './Alert';
import { Heading } from './Text';
import theme from '../../theme';

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

  const getFact = () => {
    if (canGetFact) {
      setCanGetFact(false);
      FactAlert(setCanGetFact);
    }
  };

  const AppTitle = (
    <TouchableOpacity style={styles.header} onPress={getFact}>
      <Heading allowFontScaling={false}>trackthat</Heading>
    </TouchableOpacity>
  );

  return (
    <>
      <Appbar.Header mode="small" style={styles.container}>
        <Appbar.Content title={AppTitle} />
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
    backgroundColor: theme.colors.primary,
  },
  header: {
    alignSelf: 'flex-start',
  },
});

export default AppBar;
