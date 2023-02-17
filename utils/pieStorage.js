import AsyncStorage from '@react-native-async-storage/async-storage';

class PieStorage {
  constructor(namespace = 'data') {
    this.namespace = namespace;
  }

  async getPies() {
    const pies = await AsyncStorage.getItem(`${this.namespace}:pies`);
    return pies ? JSON.parse(pies) : [];
  }

  async setPies(pies) {
    await AsyncStorage.setItem(`${this.namespace}:pies`, JSON.stringify(pies));
  }

  async removePies() {
    await AsyncStorage.removeItem(`${this.namespace}:pies`);
  }
}

export default PieStorage;
