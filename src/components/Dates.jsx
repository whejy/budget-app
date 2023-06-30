import { StyleSheet, TouchableOpacity } from 'react-native';
import { parseDates } from '../../utils/helpers';
import { DatesText } from './Text';

const Dates = ({ dates, onPress }) => {
  const { startDate, endDate } = parseDates(dates);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <DatesText>{startDate}</DatesText>
      <DatesText>{endDate}</DatesText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Dates;
