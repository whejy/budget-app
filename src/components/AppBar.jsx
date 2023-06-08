import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import AppBarTab from './AppBarTab';
import Prompt from '../Modals/Prompt';
import MenuComponent from './Menu';
import { Heading } from './Text';
import { AppBarIcon } from './Icon';
import theme from '../../theme';

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

  const AppTitle = (
    <View style={styles.header}>
      <Heading allowFontScaling={false}>trackthat</Heading>
    </View>
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
      <View style={styles.actionsContainer}>
        <AppBarTab to={'/'}>
          <AppBarIcon name="pie-chart" type="material" />
        </AppBarTab>
        <AppBarTab to={'/summary'}>
          <AppBarIcon name="insights" type="material" />
        </AppBarTab>
        <AppBarTab>
          <AppBarIcon name="stream" type="material" />
        </AppBarTab>
      </View>
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
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    justifyContent: 'space-around',
  },
  header: {
    alignSelf: 'flex-start',
  },
});

export default AppBar;
