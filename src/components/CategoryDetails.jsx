import {
  Text,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { Subheading } from './Text';
import EditExpense from '../Modals/ExpenseModal/EditExpense';
import { SecondaryIcon } from './Icon';

const ItemSeparator = () => <View style={styles.separator} />;

const EditExpenses = ({ item, category, pie, savePie, remainingIncome }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <>
      <TouchableOpacity style={styles.itemDetails} onPress={toggleModal}>
        <Text style={{ textAlign: 'center' }}>{item.item}</Text>
        <Text>${item.cost.toLocaleString('en-US')}</Text>
      </TouchableOpacity>
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
  getItemLayout,
}) => {
  const removeCategory = () => {
    delete pie.expenses[category];
    savePie(pie);
  };

  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    return getItemLayout({ height });
  };

  expenses?.sort((a, b) => b.cost - a.cost);
  return (
    <View onLayout={onLayout} style={styles.container}>
      {category === 'Income' ? (
        <Text>
          You started this period with ${pie.income.toLocaleString('en-US')}
        </Text>
      ) : category === '' ? null : (
        <>
          <View style={styles.categoryContainer}>
            <Text style={styles.hidden}>X</Text>
            <Subheading style={styles.categoryTitle}>{category}</Subheading>
            <TouchableOpacity onPress={() => removeCategory()}>
              <SecondaryIcon name="backspace" type="material" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={expenses}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={(_, i) => i}
            numColumns={4}
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
    paddingBottom: 20,
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
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
