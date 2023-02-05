import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import Pie from './Pie';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const data = [
  { x: 'Cats', y: 35 },
  { x: 'Dogs', y: 40 },
  { x: 'Birds', y: 55 },
];

const Main = () => {
  return (
    <View style={styles.container}>
      <Text>Budget Application</Text>
      <Pie data={data} />
    </View>
  );
};

export default Main;
