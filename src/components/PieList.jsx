import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import Pie from './Pie';
import AlterPies from './AlterPies';
import PieStorage from '../../utils/pieStorage';

const ItemSeparator = () => <View style={styles.separator} />;

const PieList = () => {
  const [pies, setPies] = useState([]);

  async function getStoragePies() {
    const initialPies = await PieStorage.getPies();
    return setPies(initialPies);
  }

  async function setStoragePies(newPie) {
    const updatedPies = await PieStorage.setPies(newPie);
    return setPies(updatedPies);
  }

  async function updateStoragePie(updatedPie) {
    const updatedPies = await PieStorage.updatePie(updatedPie);
    return setPies(updatedPies);
  }

  async function removeAllPies() {
    await PieStorage.removePies();
    return setPies([]);
  }

  async function removePie(pie) {
    const updatedPies = await PieStorage.removePie(pie);
    return setPies(updatedPies);
  }

  useEffect(() => {
    getStoragePies();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <AlterPies buttonText="New Pie" setStoragePies={setStoragePies} />
        {pies.length > 0 && (
          <AlterPies buttonText="Delete Pies" removeAllPies={removeAllPies} />
        )}
      </View>
      {pies.length > 0 ? (
        <View>
          <FlatList
            data={pies}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
              <Pie
                item={item}
                data={item}
                removePie={removePie}
                updatePie={updateStoragePie}
              />
            )}
            keyExtractor={(_, i) => i}
          />
        </View>
      ) : (
        <Text>Add your first pie!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 50,
  },
  container: {
    backgroundColor: 'white',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PieList;
