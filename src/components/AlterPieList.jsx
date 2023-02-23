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

  const handleDeleteAll = () => {
    setModalOpen(false);
    removeAllPies();
  };

  const handleDeleteSingle = () => {
    setModalOpen(false);
    removePie();
  };

  const child = setStoragePies ? (
    <AddPie setModalOpen={setModalOpen} updateList={setStoragePies} />
  ) : removeAllPies ? (
    <Prompt
      setModalOpen={setModalOpen}
      handleYes={handleDeleteAll}
      promptMessage={'Are you sure you want to delete all of your pie data?'}
    />
  ) : (
    <Prompt
      setModalOpen={setModalOpen}
      handleYes={handleDeleteSingle}
      promptMessage="Are you sure you want to delete this pie?"
    />
  );

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
