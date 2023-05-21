import { useEffect, useState, useRef, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import PieStorage from '../../utils/pieStorage';
import Pie from './Pie';
import FloatingButton from './FloatingButton';
import { Subheading } from './Text';

const ItemSeparator = () => <View style={styles.separator} />;

const PieList = ({ pies, setPies, currency }) => {
  const [appIsReady, setAppIsReady] = useState(false);
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
    initialiseCategories(updatedPies);
    return setPies(updatedPies);
  }

  async function updateStoragePie(updatedPie) {
    const updatedPies = await PieStorage.updatePie(updatedPie);
    return setPies(updatedPies);
  }

  async function removePie(pie) {
    const updatedPies = await PieStorage.removePie(pie);
    resetNavigate();
    initialiseCategories(updatedPies);
    return setPies(updatedPies);
  }

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
      viewOffset: 120 - height,
    });
  };

  const resetNavigate = () => {
    return handleNavigate({ height: 40, index: 0 });
  };

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <View onLayout={onLayoutRootView}>
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
            keyboardShouldPersistTaps="handled"
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item, index }) => (
              <Pie
                item={item}
                data={item}
                index={index}
                currency={currency}
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
      <FloatingButton setStoragePies={setStoragePies} />
    </>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 32,
  },
  pieList: {
    paddingTop: 40,
    paddingBottom: 120,
  },
  emptyList: {
    textAlign: 'center',
    position: 'absolute',
    left: 50,
    right: 50,
    top: 250,
  },
});

export default PieList;
