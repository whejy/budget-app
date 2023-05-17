import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppBar from './AppBar';
import PieList from './PieList';
import PieStorage from '../../utils/pieStorage';
import { gradient } from '../../theme';

const Main = () => {
  const [pies, setPies] = useState([]);
  const [currency, setCurrency] = useState('$');

  async function removeAllPies() {
    await PieStorage.removePies();
    return setPies([]);
  }

  return (
    <LinearGradient colors={gradient} style={styles.container}>
      <AppBar
        pies={pies}
        currency={currency}
        setCurrency={setCurrency}
        removeAllPies={removeAllPies}
      />
      <PieList pies={pies} currency={currency} setPies={setPies} />
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
