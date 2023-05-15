import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import AddPie from '../Modals/AddPieModal';
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
      <FAB icon="plus" color="white" style={styles.fab} onPress={toggleModal} />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});

export default FloatingButton;
