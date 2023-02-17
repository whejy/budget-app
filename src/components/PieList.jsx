import { FlatList, StyleSheet, View, Text } from 'react-native';
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
    async function getPies() {
      const { initialPies } = await usePies();
      console.log(initialPies);
      return setPies(initialPies);
    }
    getPies();
  }, []);

  const updateList = (newPie) => {
    setPies([...pies, newPie]);
  };

  const updatePie = (updatedPie) => {
    setPies(pies.map((pie) => (updatedPie.id !== pie.id ? pie : updatedPie)));
  };

  return (
    <View style={{ padding: 10 }}>
      <FormToggle buttonText="New Pie">
        <AddPie updateList={updateList} />
      </FormToggle>
      {pies.length > 0 ? (
        <FlatList
          data={pies}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <Pie item={item} data={item} updatePie={updatePie} />
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
