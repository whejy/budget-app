import { useEffect, useState, useRef, useCallback } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Pie from './Pie';
import Prompt from '../Modals/Prompt';
import PieStorage from '../../utils/pieStorage';
import AddPie from '../Modals/AddPieModal';
import { Subheading } from './Text';
import { PrimaryIcon, SecondaryIcon } from './Icon';

const ItemSeparator = () => <View style={styles.separator} />;

const PieList = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [pies, setPies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [activeCategories, setActiveCategories] = useState();
  const flatListRef = useRef();

  useEffect(() => {
    getStoragePies();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  async function getStoragePies() {
    const initialPies = await PieStorage.getPies();
    setAppIsReady(true);
    initialiseCategories(initialPies);
    return setPies(initialPies);
  }

  async function setStoragePies(newPie) {
    const updatedPies = await PieStorage.setPies(newPie);
    resetNavigate();
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
    resetNavigate();
    return setPies(updatedPies);
  }

  const handleDeleteAll = () => {
    togglePrompt();
    removeAllPies();
  };

  const initialiseCategories = (pies) => {
    const categories = pies.reduce((acc, curr, index) => {
      return [...acc, { index: index, activeCategory: '' }];
    }, []);
    setActiveCategories(categories);
  };

  const updateActiveCategory = ({ index, activeCategory }) => {
    const updatedCategories = activeCategories.map((pie) =>
      pie.index !== index
        ? pie
        : activeCategory === pie.activeCategory
        ? { ...pie, activeCategory: '' }
        : { ...pie, activeCategory }
    );
    setActiveCategories(updatedCategories);
  };

  const handleNavigate = ({ height, index }) => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0,
      viewOffset: 40 - height,
    });
  };

  const resetNavigate = () => {
    return handleNavigate({ height: 40, index: 0 });
  };

  const toggleModal = () => setModalOpen(!modalOpen);
  const togglePrompt = () => setPromptOpen(!promptOpen);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
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
        <TouchableOpacity onPress={toggleModal}>
          <PrimaryIcon
            name="add-circle-outline"
            type="material"
            {...styles.button}
          />
        </TouchableOpacity>
        {pies.length > 0 && (
          <TouchableOpacity onPress={togglePrompt}>
            <SecondaryIcon
              name="remove-circle-outline"
              type="material"
              {...styles.button}
            />
          </TouchableOpacity>
        )}
      </View>
      {pies.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.pieList}
          ref={flatListRef}
          onScrollToIndexFailed={() => {
            flatListRef.current?.scrollToOffset({
              offset: 0,
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
              updateCategory={updateActiveCategory}
              category={
                activeCategories?.filter((pie) => pie.index === index)[0]
                  ?.activeCategory
              }
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
