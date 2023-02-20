/* eslint-disable no-unused-vars */
import { FlatList, StyleSheet, View, Text } from 'react-native';
import Pie from './Pie';
import FormToggle from './FormToggle';
import AddPie from './AddPie';
// import usePies from '../hooks/usePies';
import { useEffect, useState } from 'react';
import PieStorage from '../../utils/pieStorage';

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

  async function updateStoragePie(newPie) {
    const updatedPies = await PieStorage.updatePie(newPie);
    return setPies(updatedPies);
  }

  useEffect(() => {
    getStoragePies();
  }, []);

  return (
    <View style={{ padding: 10 }}>
      <FormToggle buttonText="New Pie">
        <AddPie updateList={setStoragePies} />
      </FormToggle>
      {pies.length > 0 ? (
        <FlatList
          data={pies}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <Pie item={item} data={item} updatePie={updateStoragePie} />
          )}
          keyExtractor={(_, i) => i}
        />
      ) : (
        <Text>Add your first pie!</Text>
      )}
    </View>
  );
};

export default PieList;
