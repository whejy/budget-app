import { useRef } from 'react';
import Main from './src/components/Main';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './theme';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const navRef = useRef(null);

  return (
    <SafeAreaProvider
      style={{ flex: 1, backgroundColor: theme.colors.primary }}
    >
      <PaperProvider theme="light">
        <StatusBar style="dark" translucent={false} />
        <NavigationContainer ref={navRef}>
          <Main navRef={navRef} />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
