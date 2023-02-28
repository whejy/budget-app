import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import AppBar from './AppBar';
import PieList from './PieList';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    paddingBottom: 220,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <PieList />
    </View>
  );
};

export default Main;
