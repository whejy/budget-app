import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradient } from '../../theme';
import AppBar from './AppBar';
import PieList from './PieList';

const Main = () => {
  return (
    <LinearGradient colors={gradient} style={styles.container}>
      <AppBar />
      <PieList />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default Main;
