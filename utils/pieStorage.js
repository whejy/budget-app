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
    const updatedPies = [...currentPies, newPie];
    await AsyncStorage.setItem(
      `${this.namespace}:pies`,
      JSON.stringify(updatedPies)
    );
    return updatedPies;
  }

  async updatePie(updatedPie) {
    const currentPies = await this.getPies();
    const updatedPies = currentPies.map((pie) =>
      updatedPie.id !== pie.id ? pie : updatedPie
    );

    console.log(
      JSON.stringify(updatedPie, [
        'id',
        'dates',
        'income',
        'expenses',
        'Other',
        'item',
        'cost',
      ])
    );
    try {
      await AsyncStorage.setItem(
        `${this.namespace}:pies`,
        JSON.stringify(updatedPies, [
          'id',
          'dates',
          'income',
          'expenses',
          'Other',
          'item',
          'cost',
        ])
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
