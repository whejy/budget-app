import { StyleSheet, View } from 'react-native';
import { parseDates } from '../../utils/helpers';
import { DatesText } from './Text';

const Dates = ({ dates }) => {
  const { startDate, endDate } = parseDates(dates);
  return (
    <View style={styles.container}>
      <DatesText style={styles.dates}>{startDate}</DatesText>
      <DatesText style={styles.dates}>{endDate}</DatesText>
    </View>
  );
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
