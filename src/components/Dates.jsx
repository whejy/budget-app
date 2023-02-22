import { StyleSheet, View } from 'react-native';
import { DatesText } from './Text';
const Dates = ({ start, end }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      paddingHorizontal: 80,
    },
  });

  return (
    <View style={styles.container}>
      <DatesText>{start}</DatesText>
      <DatesText>{end}</DatesText>
    </View>
  );
};

export default Dates;
