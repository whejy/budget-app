import { useState, useEffect, useCallback, useRef } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import AppBar from './AppBar';
import TabViews from './TabViews';
import FloatingButton from './FloatingButton';
import PieStorage from '../../utils/pieStorage';
import CurrencyStorage from '../../utils/currencyStorage';

const Main = ({ navRef }) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [pies, setPies] = useState([]);
  const [currency, setCurrency] = useState('');
  const flatListRef = useRef();

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

  async function setStoragePies(newPie) {
    const updatedPies = await PieStorage.setPies(newPie);
    navRef?.current && navRef.current.navigate('Home');
    resetNavigate();
    return setPies(updatedPies);
  }

  async function removeAllPies() {
    await PieStorage.removePies();
    return setPies([]);
  }

  // Navigation for PieList
  const handleNavigate = ({ height, index }) => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0,
      viewOffset: 20 - height,
    });
  };

  const resetNavigate = () => {
    return handleNavigate({ height: 40, index: 0 });
  };

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
        handleNavigate={handleNavigate}
        onLayoutRootView={onLayoutRootView}
        setRef={flatListRef}
      />
      <FloatingButton setStoragePies={setStoragePies} />
    </>
  );
};

export default Main;
