import { Alert } from 'react-native';

const FactAlert = async ({
  title = '',
  message = 'I hope you are enjoying the app!',
  button = 'Love it',
}) => {
  try {
    const response = await fetch(
      `https://uselessfacts.jsph.pl/api/v2/facts/random`
    );
    let fact = await response.json();
    message = fact.text;
    title = 'Did you know?';
    button = 'Interesting...';
  } catch (err) {
    console.log(err);
  }

  return Alert.alert(title, message, [
    {
      text: button,
    },
  ]);
};

export default FactAlert;
