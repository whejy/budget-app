import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppBar from './AppBar';
import PieList from './PieList';
import Summary from './Summary';
import PieStorage from '../../utils/pieStorage';
import CurrencyStorage from '../../utils/currencyStorage';
import { gradient } from '../../theme';

const Main = () => {
  const [pies, setPies] = useState([]);
  const [currency, setCurrency] = useState('');

  useEffect(() => {
    getStoredCurrency();
    getStoredPies();
  }, []);

  async function getStoredCurrency() {
    const storedCurrency = await CurrencyStorage.getCurrency();
    return setCurrency(storedCurrency);
  }

  async function getStoredPies() {
    const initialPies = await PieStorage.getPies();
    return setPies(initialPies);
  }

  async function setNewCurrency(newCurrency) {
    const updatedCurrency = await CurrencyStorage.setCurrency(newCurrency);
    return setCurrency(updatedCurrency);
  }

  async function removeAllPies() {
    await PieStorage.removePies();
    return setPies([]);
  }

  return (
    <>
      <AppBar
        pies={pies}
        currency={currency}
        setCurrency={setNewCurrency}
        removeAllPies={removeAllPies}
      />
      <LinearGradient colors={gradient} style={styles.container}>
        <Routes>
          <Route
            path="/"
            element={
              <PieList pies={pies} currency={currency} setPies={setPies} />
            }
            exact
          />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/summary" element={<Summary pies={pies} />} />
        </Routes>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default Main;
