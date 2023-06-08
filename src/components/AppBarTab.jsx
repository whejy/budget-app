import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';
import FactAlert from './Alert';

const AppBarTab = ({ to, children }) => {
  const [canGetFact, setCanGetFact] = useState(true);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`${to}`);
  };

  const getFact = () => {
    if (canGetFact) {
      setCanGetFact(false);
      FactAlert(setCanGetFact);
    }
  };

  const onPress = to ? handleNavigate : getFact;

  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
};

export default AppBarTab;
