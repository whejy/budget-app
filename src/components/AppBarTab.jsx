import { TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';

const AppBarTab = ({ to, children }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`${to}`);
  };

  return (
    <TouchableOpacity onPress={handleNavigate}>{children}</TouchableOpacity>
  );
};

export default AppBarTab;
