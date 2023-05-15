import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Heading } from './Text';
import FactAlert from './Alert';
import Constants from 'expo-constants';
import theme from '../../theme';

const AppBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={FactAlert}>
        <Heading>trackthat</Heading>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.select({
      ios: Constants.statusBarHeight + 5,
      android: 5,
    }),
    backgroundColor: theme.colors.primary,
    paddingBottom: 5,
    paddingLeft: 15,
  },
});

export default AppBar;
