import { View, Button } from 'react-native';
import { useState } from 'react';
import MyModal from './Modal';
import AddPie from './AddPie';
import Prompt from './Prompt';

const AlterPieList = ({
  setStoragePies,
  removeAllPies,
  removePie,
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

  const child = setStoragePies ? (
    <AddPie setModalOpen={setModalOpen} updateList={setStoragePies} />
  ) : removeAllPies ? (
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

export default AlterPieList;
