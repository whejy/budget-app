import React from 'react';
import { Modal, StyleSheet, Pressable, View } from 'react-native';

const MyModal = ({ modalOpen, onClose, animation, children }) => {
  return (
    <Modal
      style={styles.centeredView}
      animationType={animation}
      transparent={true}
      visible={modalOpen}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable>{children}</Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 35,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default MyModal;
