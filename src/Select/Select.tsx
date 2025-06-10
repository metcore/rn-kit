import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import { useState } from 'react';

import Card from '../Ui/Card';
import Typography from '../Typography/Typography';

export default function Select() {
  const [isOpenSelect, setIsOpenSelect] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpenSelect(true)}>
        <Card>
          <View style={styles.buttonModal}>
            <Typography>Open Select</Typography>
          </View>
        </Card>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isOpenSelect}
        onRequestClose={() => {
          setIsOpenSelect(!isOpenSelect);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setIsOpenSelect(!isOpenSelect)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonModal: {
    justifyContent: 'space-between',
  },
});
