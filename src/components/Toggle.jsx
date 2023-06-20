import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch } from 'react-native-paper';
import { AppBarIcon } from './Icon';
import theme from '../../theme';

const Toggle = () => {
  const [switchOn, setSwitchOn] = useState(false);
  const toggleSwitch = () => setSwitchOn(!switchOn);

  return (
    <View style={styles.toggleContainer}>
      <AppBarIcon name="pie-chart" type="material" />
      <Switch
        value={switchOn}
        onValueChange={toggleSwitch}
        style={styles.toggleSwitch}
        color={styles.toggleSwitch.color}
      />
      <AppBarIcon name="insights" type="material" />
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleSwitch: {
    color: theme.colors.secondary,
  },
});

export default Toggle;
