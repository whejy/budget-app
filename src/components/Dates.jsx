import { StyleSheet, View, Platform } from 'react-native';
import { DatesText } from './Text';

const Dates = ({ start, end }) => {
  const platformDates = Platform.select({
    ios: (
      <>
        <DatesText style={styles.dates}>
          {start} - {end}
        </DatesText>
      </>
    ),
    android: (
      <>
        <DatesText style={styles.dates}>{start}</DatesText>
        <DatesText style={styles.dates}>{end}</DatesText>
      </>
    ),
  });
  return <View style={styles.container}>{platformDates}</View>;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  dates: {
    textAlign: 'center',
  },
});

export default Dates;
