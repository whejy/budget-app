import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import AppBar from './AppBar';
import PieList from './PieList';
import { useState, useEffect, useCallback } from 'react';
import PieStorage from '../../utils/pieStorage';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Main = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [pies, setPies] = useState([]);

  useEffect(() => {
    const prepare = () => {
      try {
        getStoragePies();
      } catch (e) {
        console.log(e);
      } finally {
        console.log('ready', pies);
        setAppIsReady(true);
      }
    };
    prepare();
  }, []);

  async function getStoragePies() {
    const initialPies = await PieStorage.getPies();
    setPies(initialPies);
  }

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    console.log('not ready');
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <AppBar />
      <PieList pies={pies} setPies={setPies} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default Main;
