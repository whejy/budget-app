import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PieList from './PieList';
import SummaryList from './SummaryList';
import theme, { gradient } from '../../theme';

const Tab = createMaterialTopTabNavigator();

const TabViews = ({
  pies,
  setPies,
  currency,
  handleNavigate,
  onLayoutRootView,
  setRef,
}) => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={styles.tabs}>
      <Tab.Screen name="Home" options={{ title: 'Home' }}>
        {() => (
          <LinearGradient colors={gradient} style={styles.container}>
            <PieList
              pies={pies}
              currency={currency}
              setPies={setPies}
              handleNavigate={handleNavigate}
              setRef={setRef}
              onLayoutRootView={onLayoutRootView}
            />
          </LinearGradient>
        )}
      </Tab.Screen>
      <Tab.Screen name="Summary" options={{ title: 'Summary' }}>
        {() => (
          <LinearGradient colors={gradient} style={styles.container}>
            <SummaryList
              pies={pies}
              currency={currency}
              onLayoutRootView={onLayoutRootView}
            />
          </LinearGradient>
        )}
      </Tab.Screen>
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

export default TabViews;
