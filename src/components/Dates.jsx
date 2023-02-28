import { StyleSheet, View } from 'react-native';
import { DatesText } from './Text';
const Dates = ({ start, end }) => {
  return (
    <View style={styles.container}>
      <DatesText>{start}</DatesText>
      <DatesText>{end}</DatesText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default Dates;
