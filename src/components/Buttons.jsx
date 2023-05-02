import { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import AddPie from '../Modals/AddPieModal';
import Prompt from '../Modals/Prompt';
import { PrimaryIcon, SecondaryIcon } from './Icon';
import theme from '../../theme';

const Buttons = ({ pies, setStoragePies, deleteAll }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);

  const handleDeleteAll = () => {
    togglePrompt();
    deleteAll();
  };

  const toggleModal = () => setModalOpen(!modalOpen);
  const togglePrompt = () => setPromptOpen(!promptOpen);

  return (
    <>
      <AddPie
        onClose={toggleModal}
        modalOpen={modalOpen}
        updateList={setStoragePies}
      />
      <Prompt
        modalOpen={promptOpen}
        onClose={togglePrompt}
        handleYes={handleDeleteAll}
        message="Are you sure you want to delete all of your pie data?"
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={toggleModal}>
            <PrimaryIcon
              name="add-circle-outline"
              type="material"
              {...styles.button}
            />
          </TouchableOpacity>
          {pies.length > 0 && (
            <TouchableOpacity onPress={togglePrompt}>
              <SecondaryIcon
                name="remove-circle-outline"
                type="material"
                {...styles.button}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 100,
    right: 100,
    zIndex: 1,
  },
  buttonGroup: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    paddingBottom: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.4,
  },
  button: {
    color: 'white',
    size: 38,
    paddingHorizontal: 20,
  },
});

export default Buttons;
