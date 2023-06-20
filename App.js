import Main from './src/components/Main';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './theme';

SplashScreen.preventAutoHideAsync();

const App = () => {
  return (
    <SafeAreaProvider
      style={{ flex: 1, backgroundColor: theme.colors.primary }}
    >
      <PaperProvider theme="light">
        <StatusBar style="dark" translucent={false} />
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
