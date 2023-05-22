import { Alert } from 'react-native';

const defaultAlert = {
  title: '',
  message: 'I hope you are enjoying the app!',
  button: 'Love it',
};

const FactAlert = async (setCanGetFact) => {
  let { title, message, button } = defaultAlert;
  try {
    const response = await fetch(
      `https://uselessfacts.jsph.pl/api/v2/facts/random`
    );
    const fact = await response.json();
    message = fact.text;
    title = 'Did you know?';
    button = 'OK...';
  } catch (err) {
    console.log(err);
  }

  return Alert.alert(title, message, [
    {
      text: button,
      onPress: () => setCanGetFact(true),
    },
  ]);
};

export default FactAlert;
