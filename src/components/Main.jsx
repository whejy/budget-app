import { StyleSheet, View } from 'react-native';
import AppBar from './AppBar';
import PieList from './PieList';

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <PieList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default Main;
