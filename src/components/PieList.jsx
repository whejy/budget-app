import { FlatList, StyleSheet, View, Text, Button } from 'react-native';
import Pie from './Pie';
// import FormToggle from './FormToggle';
import AddPie from './AddPie';
import { useEffect, useState } from 'react';
import PieStorage from '../../utils/pieStorage';
import pieStorage from '../../utils/pieStorage';
import MyModal from './Modal';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const PieList = () => {
  const [pies, setPies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

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
    <View style={{ padding: 10 }}>
      {/* <FormToggle buttonText="New Pie">
        <AddPie updateList={setStoragePies} />
      </FormToggle> */}
      <Button title="New Pie" onPress={() => setModalOpen(true)} />
      <MyModal
        animation="fade"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      >
        <AddPie setModalOpen={setModalOpen} updateList={setStoragePies} />
      </MyModal>
      {pies.length > 0 ? (
        <View>
          <Button onPress={() => removeAllPies()} title="Remove All" />
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
