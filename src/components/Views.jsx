import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PieList from './PieList';
import SummaryList from './SummaryList';
import theme, { gradient } from '../../theme';

const Tab = createMaterialTopTabNavigator();

const Views = ({ pies, setPies, currency, onLayoutRootView }) => {
  const PieView = () => {
    return (
      <LinearGradient colors={gradient} style={styles.container}>
        <PieList
          pies={pies}
          onLayoutRootView={onLayoutRootView}
          currency={currency}
          setPies={setPies}
        />
      </LinearGradient>
    );
  };

  const SummaryView = () => (
    <LinearGradient colors={gradient} style={styles.container}>
      <SummaryList
        pies={pies}
        currency={currency}
        onLayoutRootView={onLayoutRootView}
      />
    </LinearGradient>
  );

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={styles.tabs}>
      <Tab.Screen name="Home" component={PieView} options={{ title: 'Home' }} />
      <Tab.Screen
        name="Summary"
        component={SummaryView}
        options={{ title: 'Summary' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
  tabs: {
    tabBarStyle: {
      backgroundColor: theme.colors.primary,
    },
    tabBarLabelStyle: {
      color: 'white',
    },
    tabBarIndicatorStyle: {
      backgroundColor: theme.colors.secondary,
    },
    tabBarPressColor: theme.colors.secondary,
  },
});

export default Views;
