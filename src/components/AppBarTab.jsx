import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate, useLocation } from 'react-router-native';
import { Subheading } from './Text';
import theme from '../../theme';

const AppBarTab = ({ to, text }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = () => {
    navigate(`${to}`);
  };

  return (
    <TouchableOpacity style={styles.navigation} onPress={handleNavigate}>
      <Subheading
        allowFontScaling={false}
        style={[location.pathname === to && styles.active, styles.actionText]}
      >
        {text}
      </Subheading>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navigation: {
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
  actionText: {
    color: 'white',
  },
  active: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.secondary,
  },
});

export default AppBarTab;
