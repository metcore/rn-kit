import { Button, Container, Modal } from '@herca/ui-kit';
import { useState } from 'react';
import { View } from 'react-native';

export default function ModalScreen() {
  const [isOpenModalDefault, setOpenModalDefault] = useState(false);
  return (
    <View>
      <Container>
        <Button
          title="Modal Default"
          onPress={() => setOpenModalDefault(!isOpenModalDefault)}
        />
      </Container>
      <Modal
        onClose={() => setOpenModalDefault(!isOpenModalDefault)}
        isOpen={isOpenModalDefault}
      ></Modal>
    </View>
  );
}
