import React from 'react';
import AddPieForm from './AddPieForm';
import MyModal from '../Modal';

const AddPieModal = ({ modalOpen, updateList, onClose }) => {
  return (
    <MyModal animation="fade" modalOpen={modalOpen} onClose={onClose}>
      <AddPieForm updateList={updateList} closeModal={onClose} />
    </MyModal>
  );
};

export default AddPieModal;
