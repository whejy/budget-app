import { useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PieStorage from '../../utils/pieStorage';
import Pie from './Pie';
import { Subheading } from './Text';

const ItemSeparator = () => <View style={styles.separator} />;

const PieList = ({ pies, setPies, currency, onLayoutRootView }) => {
  const flatListRef = useRef();

  async function updateStoragePie(updatedPie) {
    const updatedPies = await PieStorage.updatePie(updatedPie);
    return setPies(updatedPies);
  }

  async function removePie(pie) {
    const updatedPies = await PieStorage.removePie(pie);
    resetNavigate();
    return setPies(updatedPies);
  }

  const handleNavigate = ({ height, index }) => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0,
      viewOffset: 110 - height,
    });
  };

  const resetNavigate = () => {
    return handleNavigate({ height: 40, index: 0 });
  };

  return (
    <>
      <View style={styles.container} onLayout={onLayoutRootView}>
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
                pie={item}
                index={index}
                currency={currency}
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
    </>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 32,
  },
  container: {
    flex: 1,
  },
  pieList: {
    paddingVertical: 20,
    flexGrow: 1,
  },
  emptyList: {
    textAlign: 'center',
    fontStyle: 'italic',
    position: 'absolute',
    left: 50,
    right: 50,
    top: 250,
  },
});

export default PieList;
