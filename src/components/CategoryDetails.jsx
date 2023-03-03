import { Text, FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { Subheading } from './Text';
import EditExpenseModal from '../Modals/EditExpense/index.jsx';

const ItemSeparator = () => <View style={styles.separator} />;

const EditExpenses = ({
  updateExpense,
  removeExpense,
  item,
  category,
  remainingIncome,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <>
      <Pressable style={styles.itemDetails} onPress={toggleModal}>
        <Text style={{ textAlign: 'center' }}>{item.item}</Text>
        <Text>${item.cost.toLocaleString('en-US')}</Text>
      </Pressable>
      <EditExpenseModal
        modalOpen={modalOpen}
        onClose={toggleModal}
        updateExpense={updateExpense}
        removeExpense={removeExpense}
        item={item}
        category={category}
        remainingIncome={remainingIncome}
      />
    </>
  );
};

const CategoryDetails = ({
  expenses,
  category,
  pie,
  updatePie,
  remainingIncome,
}) => {
  const removeCategory = () => {
    delete pie.expenses[category];
    updatePie(pie);
  };

  const handleRemoveExpense = (expenseToRemove) => {
    const updatedPie = removeExpense(expenseToRemove);
    updatePie(updatedPie);
  };

  const handleUpdateExpense = (expenseToUpdate) => {
    const { updatedItem, newCategory } = expenseToUpdate;
    const updatedPie = removeExpense(updatedItem);
    addExpense({ updatedPie, updatedItem, newCategory });
  };

  const removeExpense = (expenseToRemove) => {
    const updatedCategory = pie.expenses[category].filter(
      (expense) => expense.id !== expenseToRemove.id
    );

    // If this item is the final item within the category, remove category
    updatedCategory.length > 0
      ? (pie.expenses[category] = updatedCategory)
      : delete pie.expenses[category];

    return pie;
  };

  const addExpense = (data) => {
    const { updatedPie, updatedItem, newCategory } = data;

    const addItem = ({ id, item, cost, category }) => {
      Object.keys(updatedPie.expenses).includes(category)
        ? updatedPie.expenses[category].push({ id, item, cost })
        : (updatedPie.expenses[category] = [{ id, item, cost }]);
    };
    addItem({ ...updatedItem, category: newCategory });
    updatePie(pie);
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
              <Text style={styles.delete}>X</Text>
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
                updateExpense={handleUpdateExpense}
                removeExpense={handleRemoveExpense}
                item={item}
                category={category}
                remainingIncome={remainingIncome}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemContainer: {},
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
  delete: {
    fontSize: 22,
    color: 'red',
  },
});

export default CategoryDetails;
