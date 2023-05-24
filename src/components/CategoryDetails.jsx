import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Text from './Text';
import { Subheading } from './Text';
import EditExpense from '../Modals/ExpenseModal/EditExpense';
import EditPie from '../Modals/PieModal/EditPie';
import { PrimaryIcon, SecondaryIcon } from './Icon';
import Prompt from '../Modals/Prompt';

const ItemSeparator = () => <View style={styles.separator} />;

const EditExpenses = ({
  item,
  category,
  pie,
  savePie,
  remainingIncome,
  currency,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <>
      <TouchableOpacity style={styles.itemDetails} onPress={toggleModal}>
        <Text style={{ textAlign: 'center' }}>{item.item}</Text>
        <Text>
          {currency}
          {item.cost.toLocaleString('en-US')}
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
  expenses,
  category,
  pie,
  savePie,
  remainingIncome,
  totalExpenses,
  getItemLayout,
  currency,
}) => {
  const [promptOpen, setPromptOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const removeCategory = () => {
    delete pie.expenses[category];
    savePie(pie);
  };

  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    return getItemLayout({ height });
  };

  const togglePrompt = () => setPromptOpen(!promptOpen);
  const toggleEdit = () => setEditModalOpen(!editModalOpen);

  const sortedExpenses = expenses?.sort((a, b) => b.cost - a.cost);

  const categoryIcons =
    category === 'Income' ? (
      <TouchableOpacity onPress={toggleEdit}>
        <PrimaryIcon name="add-circle" type="material" />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={() => togglePrompt()}>
        <SecondaryIcon name="backspace" type="material" />
      </TouchableOpacity>
    );

  const incomeCategory = (
    <Text style={styles.income}>
      You started this period with {currency}
      {pie.income.toLocaleString('en-US')}
    </Text>
  );

  return (
    <View onLayout={onLayout} style={styles.container}>
      <Prompt
        modalOpen={promptOpen}
        onClose={togglePrompt}
        handleYes={removeCategory}
        message="Delete this category?"
      />
      <EditPie
        modalOpen={editModalOpen}
        onClose={toggleEdit}
        pie={pie}
        savePie={savePie}
        totalExpenses={totalExpenses}
      />
      {category === '' ? null : (
        <>
          <View style={styles.categoryContainer}>
            <Text style={styles.hidden}>X</Text>
            <Subheading style={styles.categoryTitle}>{category}</Subheading>
            {categoryIcons}
          </View>
          <FlatList
            data={sortedExpenses}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={(_, i) => i}
            numColumns={3}
            ListEmptyComponent={incomeCategory}
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
  income: {
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
