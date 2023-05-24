import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import AddPie from '../Modals/PieModal/AddPie';
import theme from '../../theme';

const FloatingButton = ({ setStoragePies }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <>
      <AddPie
        onClose={toggleModal}
        modalOpen={modalOpen}
        updateList={setStoragePies}
      />
      <FAB
        icon="plus"
        mode="elevated"
        color="white"
        style={styles.fab}
        onPress={toggleModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 5,
    bottom: 5,
    backgroundColor: theme.colors.primary,
  },
});

export default FloatingButton;
