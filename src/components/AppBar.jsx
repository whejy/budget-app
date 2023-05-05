import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Heading } from './Text';
import FactAlert from './Alert';
import Constants from 'expo-constants';
import theme from '../../theme';

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <TouchableOpacity onPress={FactAlert}>
          <Heading>TRACKTHAT</Heading>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.select({
      ios: Constants.statusBarHeight + 5,
      android: 5,
    }),
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingBottom: 5,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.4,
  },
});

export default AppBar;
