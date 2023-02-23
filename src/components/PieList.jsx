import { FlatList, StyleSheet, View, Text } from 'react-native';
import Pie from './Pie';
import { useEffect, useState } from 'react';
import PieStorage from '../../utils/pieStorage';
import pieStorage from '../../utils/pieStorage';
import AlterPieList from './AlterPieList';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

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
    await pieStorage.removePies();
    return setPies([]);
  }

  async function removePie(pie) {
    const updatedPies = await pieStorage.removePie(pie);
    return setPies(updatedPies);
  }

  useEffect(() => {
    getStoragePies();
  }, []);

  return (
    <View style={{ paddingBottom: 350 }}>
      <AlterPieList buttonText="New Pie" setStoragePies={setStoragePies} />
      {pies.length > 0 ? (
        <View>
          <AlterPieList
            buttonText="Remove Pies"
            removeAllPies={removeAllPies}
          />
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

export default PieList;
