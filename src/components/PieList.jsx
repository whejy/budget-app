import { FlatList, StyleSheet, View } from 'react-native';
import Pie from './Pie';
import FormToggle from './FormToggle';
import AddPie from './AddPie';
import usePies from '../hooks/usePies';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const PieList = () => {
  const [pies, setPies] = useState([]);

  useEffect(() => {
    const { initialPies } = usePies();
    setPies(initialPies);
  }, []);

  const updateList = (newPie) => {
    setPies([...pies, newPie]);
  };

  // NEED TO ADD ID TO PIE
  const updatePie = (updatedPie) => {
    setPies(
      pies.map((pie) =>
        updatedPie.dates.weekStart !== pie.dates.weekStart ? pie : updatedPie
      )
    );
  };

  return (
    <View style={{ padding: 10 }}>
      <FormToggle buttonText="New Pie">
        <AddPie updateList={updateList} />
      </FormToggle>
      <FlatList
        data={pies}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pie item={item} data={item} updatePie={updatePie} />
        )}
        keyExtractor={(_, i) => i}
      />
    </View>
  );
};

export default PieList;
