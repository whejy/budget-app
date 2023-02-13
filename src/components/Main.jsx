import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import PieList from './PieList';
import AddPie from './AddPie';
import FormToggle from './FormToggle';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Text>Budget Application</Text>
      <FormToggle buttonText="New Pie">
        <AddPie />
      </FormToggle>
      <PieList />
    </View>
  );
};

export default Main;
