import { View, StyleSheet, ScrollView } from 'react-native';
import { Heading } from './Text';
import Constants from 'expo-constants';
import theme from '../../theme';
// import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    alignItems: 'center',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const AppBar = () => {
  //   const tabs = (
  //     <>
  //       <AppBarTab to={'/'}>Repositories</AppBarTab>;{' '}
  //       {user === null ? (
  //         <AppBarTab to={'/signin'}>Sign in</AppBarTab>
  //       ) : (
  //         <AppBarTab onPress={signOut}>Sign out</AppBarTab>
  //       )}
  //       ;
  //     </>
  //   );

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.flexContainer}>
          <Heading>BudgetMe</Heading>
        </View>
        {/* <View style={styles.flexContainer}>{tabs}</View> */}
      </ScrollView>
    </View>
  );
};

export default AppBar;
