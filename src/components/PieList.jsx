import { FlatList, StyleSheet, View } from 'react-native';
import PieStorage from '../../utils/pieStorage';
import Pie from './Pie';
import { Subheading } from './Text';

const ItemSeparator = () => <View style={styles.separator} />;

const PieList = ({
  pies,
  setPies,
  currency,
  handleNavigate,
  onLayoutRootView,
  setRef,
}) => {
  async function updateStoragePie(updatedPie) {
    const updatedPies = await PieStorage.updatePie(updatedPie);
    return setPies(updatedPies);
  }

  async function removePie(pie) {
    const updatedPies = await PieStorage.removePie(pie);
    return setPies(updatedPies);
  }

  const renderItem = ({ item, index }) => (
    <Pie
      pie={item}
      index={index}
      currency={currency}
      handleNavigate={handleNavigate}
      removePie={removePie}
      savePie={updateStoragePie}
    />
  );

  return (
    <>
      <View style={styles.container} onLayout={onLayoutRootView}>
        {pies.length > 0 ? (
          <FlatList
            contentContainerStyle={styles.pieList}
            ref={setRef}
            onScrollToIndexFailed={() => {
              setRef.current?.scrollToOffset({
                offset: 0,
                animated: true,
              });
            }}
            data={pies}
            keyboardShouldPersistTaps="handled"
            ItemSeparatorComponent={ItemSeparator}
            renderItem={renderItem}
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
