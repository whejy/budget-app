import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Pressable } from 'react-native';
import Pie from './Pie';
import Prompt from '../Modals/Prompt';
import PieStorage from '../../utils/pieStorage';
import AddPie from '../Modals/AddPieModal';
import { Subheading } from './Text';
import { Icon } from '@rneui/themed';
import theme from '../../theme';

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
    <View>
      <AddPie
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
        <Pressable onPress={toggleModal}>
          <Icon
            {...styles.addButton}
            name="add-circle-outline"
            type="material"
          />
        </Pressable>
        {pies.length > 0 && (
          <Pressable onPress={togglePrompt}>
            <Icon
              {...styles.deleteButton}
              name="remove-circle-outline"
              type="material"
            />
          </Pressable>
        )}
      </View>
      {pies.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.pieList}
          data={pies}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <Pie
              item={item}
              data={item}
              removePie={removePie}
              savePie={updateStoragePie}
            />
          )}
          keyExtractor={(_, i) => i}
        />
      ) : (
        <Subheading style={styles.emptyList}>Add your first pie!</Subheading>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 50,
  },
  pieList: {
    paddingTop: 20,
    paddingBottom: 200,
  },
  emptyList: {
    textAlign: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  addButton: {
    size: theme.iconSize.size + 5,
    color: theme.colors.editButton,
    paddingHorizontal: 22,
  },
  deleteButton: {
    size: theme.iconSize.size + 5,
    color: theme.colors.deleteButton,
    paddingHorizontal: 22,
  },
});

export default PieList;
