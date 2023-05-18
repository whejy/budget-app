import AsyncStorage from '@react-native-async-storage/async-storage';

class CurrencyStorage {
  constructor(namespace = 'data') {
    this.namespace = namespace;
  }

  async getCurrency() {
    const currency = await AsyncStorage.getItem(`${this.namespace}:currency`);
    return currency ? JSON.parse(currency) : '$';
  }

  async setCurrency(currency) {
    try {
      await AsyncStorage.setItem(
        `${this.namespace}:currency`,
        JSON.stringify(currency)
      );
    } catch (e) {
      console.log(e);
    }
    return currency;
  }
}

export default new CurrencyStorage();
