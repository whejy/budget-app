import Main from './src/components/Main';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import theme from './theme';

SplashScreen.preventAutoHideAsync();

const App = () => {
  return (
    <SafeAreaProvider
      style={{ flex: 1, backgroundColor: theme.colors.primary }}
    >
      <StatusBar style="dark" translucent={false} />
      <Main />
    </SafeAreaProvider>
  );
};

export default App;
