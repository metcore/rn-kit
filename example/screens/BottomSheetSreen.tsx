import {
  BottomSheet,
  Button,
  Center,
  Color,
  Container,
  Typography,
} from '@herca/ui-kit';
import { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function BottomSheetScreen() {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [isOpenBottomSheetPullBar, setIsOpenBottomSheetPullBar] =
    useState(false);
  const [isOpenBottomSheetFull, setIsOpenBottomSheetFull] = useState(false);
  const [isOpenBottomSheetFooter, setIsOpenBottomSheetFooter] = useState(false);

  return (
    <Container>
      <BottomSheet
        isOpen={isOpenBottomSheet}
        onClose={() => setIsOpenBottomSheet(false)}
      >
        <View style={styles.containerBottomSheet}>
          <Typography variant="p2" weight="semibold" color={Color.gray[800]}>
            Judul Modal
          </Typography>
          <Typography variant="t1" weight="regular" color={Color.gray[500]}>
            Ini modal biasa tanpa custom pull bar.
          </Typography>
          <Button
            size="medium"
            color="primary"
            title="Close Bottom Sheet"
            block
            onPress={() => setIsOpenBottomSheet(false)}
          />
        </View>
      </BottomSheet>

      <BottomSheet
        isOpen={isOpenBottomSheetPullBar}
        onClose={() => setIsOpenBottomSheetPullBar(false)}
        pullBar={
          <View style={{ marginTop: -60 }}>
            <Image
              source={require('../assets/bottomsheet.png')}
              width={50}
              height={50}
            />
          </View>
        }
      >
        <View>
          <Center style={{ gap: 15 }}>
            <Typography variant="p2" weight="semibold" color={Color.gray[800]}>
              Judul Modal dengan PullBar
            </Typography>
            <Typography variant="t1" weight="regular" color={Color.gray[500]}>
              Ini modal dengan pull bar custom pakai image.
            </Typography>
            <Button
              size="medium"
              color="primary"
              title="Close Bottom Sheet"
              block
              onPress={() => setIsOpenBottomSheetPullBar(false)}
            />
          </Center>
        </View>
      </BottomSheet>

      <BottomSheet
        isOpen={isOpenBottomSheetFull}
        height={'100%'}
        onClose={() => setIsOpenBottomSheetFull(false)}
      >
        <View style={styles.containerBottomSheet}>
          <Typography variant="p2" weight="semibold" color={Color.gray[800]}>
            Judul Modal
          </Typography>
          <Typography variant="t1" weight="regular" color={Color.gray[500]}>
            Ini modal biasa tanpa custom pull bar.
          </Typography>
          <Button
            size="medium"
            color="primary"
            title="Close Bottom Sheet"
            block
            onPress={() => setIsOpenBottomSheetFull(false)}
          />
        </View>
      </BottomSheet>

      <BottomSheet
        isOpen={isOpenBottomSheetFooter}
        height={'100%'}
        onClose={() => setIsOpenBottomSheetFooter(false)}
        footer={
          <Button
            title="click here"
            onPress={() => setIsOpenBottomSheetFooter(false)}
          />
        }
      >
        <View style={styles.containerBottomSheet}>
          <Typography variant="p2" weight="semibold" color={Color.gray[800]}>
            Judul Modal
          </Typography>

          <Typography variant="t1" weight="regular" color={Color.gray[500]}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
          <Typography variant="t1" weight="regular" color={Color.gray[500]}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
          <Typography variant="t1" weight="regular" color={Color.gray[500]}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
        </View>
      </BottomSheet>

      {/* Tombol Aksi */}
      <View style={{ gap: 10, marginTop: 20 }}>
        <Button
          title="Open Bottom Sheet"
          color="primary"
          onPress={() => setIsOpenBottomSheet(true)}
        />
        <Button
          title="Open Bottom Sheet w/ Custom PullBar"
          color="primary"
          onPress={() => setIsOpenBottomSheetPullBar(true)}
        />
        <Button
          title="Open Bottom Sheet Full"
          color="primary"
          onPress={() => setIsOpenBottomSheetFull(true)}
        />
        <Button
          title="Open Bottom With Footer"
          color="primary"
          onPress={() => setIsOpenBottomSheetFooter(true)}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  containerBottomSheet: {
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
