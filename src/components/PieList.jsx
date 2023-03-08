/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import { FlatList, StyleSheet, View, Pressable } from 'react-native';
import Pie from './Pie';
import Prompt from '../Modals/Prompt';
import PieStorage from '../../utils/pieStorage';
import AddPie from '../Modals/AddPieModal';
import { Subheading } from './Text';
import { PrimaryIcon, SecondaryIcon } from './Icon';

const ItemSeparator = () => <View style={styles.separator} />;

const PieList = () => {
  const [pies, setPies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const flatListRef = useRef();

  const handleNavigate = ({ x, y, width, height, index }) => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0,
      viewOffset: 40 - height,
    });
  };

  // const getItemLayout = (data, index) => ({
  //   length: 50,
  //   offset: 50 * index,
  //   index,
  // });

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
      <View style={styles.buttonContainer}>
        <Pressable onPress={toggleModal}>
          <PrimaryIcon
            name="add-circle-outline"
            type="material"
            {...styles.button}
          />
        </Pressable>
        {pies.length > 0 && (
          <Pressable onPress={togglePrompt}>
            <SecondaryIcon
              name="remove-circle-outline"
              type="material"
              {...styles.button}
            />
          </Pressable>
        )}
      </View>
      {pies.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.pieList}
          ref={flatListRef}
          onScrollToIndexFailed={({ index, averageItemLength }) => {
            flatListRef.current?.scrollToOffset({
              offset: index * averageItemLength,
              animated: true,
            });
          }}
          data={pies}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item, index }) => (
            <Pie
              item={item}
              data={item}
              index={index}
              handleNavigate={handleNavigate}
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    size: 38,
    paddingHorizontal: 20,
  },
});

export default PieList;
