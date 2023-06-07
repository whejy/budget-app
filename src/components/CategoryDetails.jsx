import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Text from './Text';
import { Subheading } from './Text';
import EditExpense from '../Modals/ExpenseModal/EditExpense';
import { SecondaryIcon } from './Icon';
import Prompt from '../Modals/Prompt';

const ItemSeparator = () => <View style={styles.separator} />;

const EditExpenses = ({
  pie,
  item,
  category,
  savePie,
  remainingIncome,
  currency,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <>
      <TouchableOpacity style={styles.itemDetails} onPress={toggleModal}>
        <Text style={styles.centred}>{item.item}</Text>
        <Text>
          {currency}
          {item.amount.toLocaleString('en-US')}
        </Text>
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
  category,
  categoryItems,
  pie,
  savePie,
  remainingIncome,
  getItemLayout,
  currency,
}) => {
  const [promptOpen, setPromptOpen] = useState(false);

  const togglePrompt = () => setPromptOpen(!promptOpen);

  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    return getItemLayout({ height });
  };

  const removeCategory = () => {
    delete pie.expenses[category];
    togglePrompt();
    savePie(pie);
  };

  const sortedFlatlistData = categoryItems.sort((a, b) => b.amount - a.amount);

  return (
    <View onLayout={onLayout} style={styles.container}>
      <Prompt
        modalOpen={promptOpen}
        onClose={togglePrompt}
        handleYes={removeCategory}
        message="Delete this category?"
      />
      {category === '' ? null : (
        <>
          <View style={styles.categoryContainer}>
            {category === 'Income' ? (
              <Subheading style={styles.categoryTitle}>{category}</Subheading>
            ) : (
              <>
                <Text style={styles.hidden}>X</Text>
                <Subheading style={styles.categoryTitle}>{category}</Subheading>
                <TouchableOpacity onPress={() => togglePrompt()}>
                  <SecondaryIcon name="backspace" type="material" />
                </TouchableOpacity>
              </>
            )}
          </View>
          <FlatList
            data={sortedFlatlistData}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={(_, i) => i}
            numColumns={3}
            renderItem={({ item }) => (
              <EditExpenses
                savePie={savePie}
                item={item}
                category={category}
                remainingIncome={remainingIncome}
                pie={pie}
                currency={currency}
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
    paddingBottom: 10,
  },
  itemDetails: {
    width: 100,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centred: {
    textAlign: 'center',
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
