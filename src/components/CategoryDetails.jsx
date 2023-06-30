import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ItemSeparator } from './Separators';
import EditExpense from '../Modals/ExpenseModal/EditExpense';
import Prompt from '../Modals/Prompt';
import { SecondaryIcon } from './Icon';
import Text, { Subheading } from './Text';

const EditExpenses = ({
  pie,
  item,
  category,
  savePie,
  remainingIncome,
  currency,
  summary,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);
  const onExpensePress = summary ? null : toggleModal;

  return (
    <>
      <TouchableOpacity style={styles.itemDetails} onPress={onExpensePress}>
        {item.item && <Text style={styles.item}>{item.item}</Text>}
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
  summary,
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

  const sortedFlatlistData = categoryItems?.sort((a, b) => b.amount - a.amount);

  const renderItem = ({ item }) => (
    <EditExpenses
      savePie={savePie}
      item={item}
      category={category}
      remainingIncome={remainingIncome}
      pie={pie}
      currency={currency}
      summary={summary}
    />
  );

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
            {category === 'Income' || summary ? (
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
            renderItem={renderItem}
            numColumns={3}
            ItemSeparatorComponent={ItemSeparator}
            listKey={(_, index) => 'D' + index.toString()}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  item: {
    textAlign: 'center',
    fontStyle: 'italic',
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
