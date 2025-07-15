import {
  BottomSheet,
  Button,
  Center,
  Color,
  Container,
  Input,
  Typography,
} from '@herca/rn-kit';
import { useState } from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import summaryData from '../assets/loremipsum.json';

export default function BottomSheetScreen() {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [isOpenBottomSheetPullBar, setIsOpenBottomSheetPullBar] =
    useState(false);
  const [isOpenBottomSheetFull, setIsOpenBottomSheetFull] = useState(false);
  const [isOpenBottomSheetFooter, setIsOpenBottomSheetFooter] = useState(false);
  const [isOpenBottomSheetInput, setIsOpenBottomSheetInput] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

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
        <ScrollView>
          <View style={styles.containerBottomSheet}>
            <Typography variant="p2" weight="semibold" color={Color.gray[800]}>
              Judul Modal
            </Typography>

            <Typography variant="t1" weight="regular" color={Color.gray[500]}>
              {summaryData.summary}
            </Typography>
            <Typography variant="t1" weight="regular" color={Color.gray[500]}>
              {summaryData.summary}
            </Typography>
            <Typography variant="t1" weight="regular" color={Color.gray[500]}>
              {summaryData.summary}
            </Typography>
            <Typography variant="t1" weight="regular" color={Color.gray[500]}>
              {summaryData.summary}
            </Typography>
          </View>
        </ScrollView>
      </BottomSheet>

      <BottomSheet
        isOpen={isOpenBottomSheetInput}
        onClose={() => setIsOpenBottomSheetInput(false)}
        footer={
          <Button
            title="click here"
            color="primary"
            onPress={() => {
              if (!value) {
                setHasError(true);
              } else {
                setIsOpenBottomSheetInput(false);
              }
            }}
          />
        }
      >
        <View>
          <Input
            label="Email Customer"
            placeholder="Masukan email"
            hint={hasError ? 'Masukan email' : ''}
            autoFocus={true}
            onChangeText={(val) => {
              setValue(val);
              setHasError(false);
            }}
            hasError={hasError}
          />
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
        <Button
          title="Open Bottom Input"
          color="primary"
          onPress={() => setIsOpenBottomSheetInput(true)}
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
