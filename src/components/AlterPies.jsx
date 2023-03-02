import { View, Button } from 'react-native';
import { useState } from 'react';
import MyModal from './Modal';
import Prompt from './Prompt';
import AddExpense from './AddExpense';

const AlterPies = ({
  removeAllPies,
  removePie,
  updatePie,
  pie,
  remainingIncome,
  buttonText,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDeleteAll = () => {
    closeModal();
    removeAllPies();
  };

  const handleDeleteSingle = () => {
    closeModal();
    removePie();
  };

  const child = removeAllPies ? (
    <Prompt
      handleYes={handleDeleteAll}
      handleNo={closeModal}
      message="Are you sure you want to delete all of your pie data?"
    />
  ) : removePie ? (
    <Prompt
      handleYes={handleDeleteSingle}
      handleNo={closeModal}
      message="Are you sure you want to delete this pie?"
    />
  ) : updatePie ? (
    <AddExpense
      updatePie={updatePie}
      pie={pie}
      remainingIncome={remainingIncome}
      setModalOpen={setModalOpen}
    />
  ) : null;

  return (
    <View>
      <Button title={buttonText} onPress={() => setModalOpen(true)} />
      <MyModal
        animation="fade"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      >
        {child}
      </MyModal>
    </View>
  );
};

export default AlterPies;
