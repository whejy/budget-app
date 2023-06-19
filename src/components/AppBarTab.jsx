import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate, useLocation } from 'react-router-native';
import theme from '../../theme';

const AppBarTab = ({ to, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = () => {
    navigate(`${to}`);
  };

  return (
    <TouchableOpacity
      style={location.pathname === to && styles.active}
      onPress={handleNavigate}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  active: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.secondary,
  },
});

export default AppBarTab;
