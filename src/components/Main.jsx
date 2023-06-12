import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import AppBar from './AppBar';
import PieList from './PieList';
import Summary from './Summary';
import PieStorage from '../../utils/pieStorage';
import CurrencyStorage from '../../utils/currencyStorage';
import { gradient } from '../../theme';

const Main = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [pies, setPies] = useState([]);
  const [currency, setCurrency] = useState('');

  useEffect(() => {
    async function prepare() {
      try {
        await getStoredPies();
        await getStoredCurrency();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
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

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
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
        <View onLayout={onLayoutRootView}>
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
        </View>
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
