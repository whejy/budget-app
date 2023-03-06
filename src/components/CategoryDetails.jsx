import { Text, FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { Subheading } from './Text';
import EditExpense from '../Modals/ExpenseModal/EditExpense';
import { Icon } from '@rneui/themed';

const ItemSeparator = () => <View style={styles.separator} />;

const EditExpenses = ({ item, category, pie, savePie, remainingIncome }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <>
      <Pressable style={styles.itemDetails} onPress={toggleModal}>
        <Text style={{ textAlign: 'center' }}>{item.item}</Text>
        <Text>${item.cost.toLocaleString('en-US')}</Text>
      </Pressable>
      <EditExpense
        modalOpen={modalOpen}
        onClose={toggleModal}
        item={item}
        category={category}
        remainingIncome={remainingIncome}
        pie={pie}
        savePie={savePie}
      />
    </>
  );
};

const CategoryDetails = ({
  expenses,
  category,
  pie,
  savePie,
  remainingIncome,
}) => {
  const removeCategory = () => {
    delete pie.expenses[category];
    savePie(pie);
  };

  expenses?.sort((a, b) => b.cost - a.cost);
  return (
    <View style={styles.container}>
      {expenses ? (
        <>
          <View style={styles.categoryContainer}>
            <Text style={styles.hidden}>X</Text>
            <Subheading style={styles.categoryTitle}>{category}</Subheading>
            <Pressable onPress={() => removeCategory()}>
              <Icon color="red" size="20" name="backspace" type="material" />
            </Pressable>
          </View>
          <FlatList
            data={expenses}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={(_, i) => i}
            numColumns={4}
            columnWrapperStyle={styles.itemContainer}
            renderItem={({ item }) => (
              <EditExpenses
                savePie={savePie}
                item={item}
                category={category}
                remainingIncome={remainingIncome}
                pie={pie}
              />
            )}
          />
        </>
      ) : (
        <Text>
          You started this period with ${pie.income.toLocaleString('en-US')}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemDetails: {
    width: 80,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hidden: {
    opacity: 0,
    height: 0,
  },
  categoryTitle: {
    paddingHorizontal: 10,
  },
});

export default CategoryDetails;
