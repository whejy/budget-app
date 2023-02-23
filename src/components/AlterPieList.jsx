import { View, Button } from 'react-native';
import { useState } from 'react';
import MyModal from './Modal';
import AddPie from './AddPie';
import Prompt from './Prompt';

const AlterPieList = ({ setStoragePies, removeAllPies, buttonText }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = () => {
    setModalOpen(false);
    removeAllPies();
  };

  const promptMessage = 'Are you sure you want to delete all of your data?';

  const child = setStoragePies ? (
    <AddPie setModalOpen={setModalOpen} updateList={setStoragePies} />
  ) : (
    <Prompt
      setModalOpen={setModalOpen}
      handleYes={handleDelete}
      promptMessage={promptMessage}
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
        <View>{child}</View>
      </MyModal>
    </View>
  );
};

export default AlterPieList;
