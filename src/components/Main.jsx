import { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import AppBar from './AppBar';
import TabViews from './TabViews';
import PieStorage from '../../utils/pieStorage';
import CurrencyStorage from '../../utils/currencyStorage';

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

  async function setNewCurrency(newCurrency) {
    const updatedCurrency = await CurrencyStorage.setCurrency(newCurrency);
    return setCurrency(updatedCurrency);
  }

  async function getStoredPies() {
    const initialPies = await PieStorage.getPies();
    return setPies(initialPies);
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
      <TabViews
        pies={pies}
        setPies={setPies}
        currency={currency}
        onLayoutRootView={onLayoutRootView}
      />
    </>
  );
};

export default Main;
