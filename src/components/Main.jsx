import { StyleSheet } from 'react-native';
import theme from '../../theme';
import { LinearGradient } from 'expo-linear-gradient';
import AppBar from './AppBar';
import PieList from './PieList';

const Main = () => {
  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.secondary]}
      style={styles.container}
    >
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
