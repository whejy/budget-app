import AsyncStorage from '@react-native-async-storage/async-storage';

class PieStorage {
  constructor(namespace = 'data') {
    this.namespace = namespace;
  }

  async getPies() {
    const pies = await AsyncStorage.getItem(`${this.namespace}:pies`);
    return pies ? JSON.parse(pies) : [];
  }

  async setPies(newPie) {
    const currentPies = await this.getPies();
    const updatedPies = [newPie, ...currentPies];
    try {
      await AsyncStorage.setItem(
        `${this.namespace}:pies`,
        JSON.stringify(updatedPies)
      );
    } catch (e) {
      console.log(e);
    }
    return updatedPies;
  }

  async updatePie(updatedPie) {
    const currentPies = await this.getPies();
    const updatedPies = currentPies.map((pie) =>
      updatedPie.id !== pie.id ? pie : updatedPie
    );

    try {
      await AsyncStorage.setItem(
        `${this.namespace}:pies`,
        JSON.stringify(updatedPies)
      );
    } catch (e) {
      console.log(e);
    }
    return updatedPies;
  }

  async removePie(removedPie) {
    const currentPies = await this.getPies();
    const updatedPies = currentPies.filter((pie) => pie.id !== removedPie.id);

    try {
      await AsyncStorage.setItem(
        `${this.namespace}:pies`,
        JSON.stringify(updatedPies)
      );
    } catch (e) {
      console.log(e);
    }
    return updatedPies;
  }

  async removePies() {
    await AsyncStorage.removeItem(`${this.namespace}:pies`);
  }
}

export default new PieStorage();
