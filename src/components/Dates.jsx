import { StyleSheet, View } from 'react-native';
import { DatesText } from './Text';
const Dates = ({ start, end }) => {
  return (
    <View style={styles.container}>
      <DatesText>
        {start} - {end}
      </DatesText>
      {/* <DatesText>{end}</DatesText> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Dates;
