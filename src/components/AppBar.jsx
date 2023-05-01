import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Heading } from './Text';
import FactAlert from './Alert';
import Constants from 'expo-constants';

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <TouchableOpacity onPress={FactAlert}>
          <Heading>TrackThat</Heading>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 15,
    alignItems: 'center',
  },
});

export default AppBar;
