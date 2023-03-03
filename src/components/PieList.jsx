import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, Button } from 'react-native';
import Pie from './Pie';
import Prompt from '../Modals/Prompt';
import PieStorage from '../../utils/pieStorage';
import AddPieModal from '../Modals/AddPieModal';

const ItemSeparator = () => <View style={styles.separator} />;

const PieList = () => {
  const [pies, setPies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);
  const togglePrompt = () => setPromptOpen(!promptOpen);

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

  const handleDeleteAll = () => {
    togglePrompt();
    removeAllPies();
  };

  useEffect(() => {
    getStoragePies();
  }, []);

  return (
    <View style={styles.container}>
      <AddPieModal
        onClose={toggleModal}
        modalOpen={modalOpen}
        updateList={setStoragePies}
      />
      <Prompt
        modalOpen={promptOpen}
        onClose={togglePrompt}
        handleYes={handleDeleteAll}
        message="Are you sure you want to delete all of your pie data?"
      />
      <View style={styles.buttons}>
        <Button title="New Pie" onPress={toggleModal} />
        {pies.length > 0 && (
          <Button title="Delete Pies" onPress={togglePrompt} />
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
    display: 'flex',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PieList;
