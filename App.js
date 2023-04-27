import Main from './src/components/Main';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <Main />
    </SafeAreaProvider>
  );
};

export default App;
