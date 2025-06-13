import {
  Badge,
  BottomSheet,
  Button,
  Center,
  CheckBox,
  Color,
  Container,
  Footer,
  List,
  ListItem,
  Modal,
  Typography,
} from '@herca/ui-kit';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const DATA_LEAVE = [
  { date: '2025-01-12' },
  { date: '2025-01-13' },
  { date: '2025-01-14' },
  { date: '2025-01-15' },
];

export default function LeaveApproveScreen() {
  const navigation = useNavigation();
  const [isOpenBottomSheetConfirmSubmit, setIsOpenBottomSheetConfirmSubmit] =
    useState<boolean>(false);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false);
  const [dataDayLeave, setDataDayLeave] = useState<Record<string, boolean>>({});
  const [hasError, setHasError] = useState<boolean>(false);

  const handleApproveLeave = () => {
    if (!dataDayLeave || Object.keys(dataDayLeave).length === 0) {
      setHasError(true);
    } else {
      setIsOpenBottomSheetConfirmSubmit(true);
    }
  };

  const handlePressButtonListItem = (date: string) => {
    setHasError(false);
    setDataDayLeave((prev) => {
      const newState = { ...prev };
      if (newState[date]) {
        delete newState[date];
      } else {
        newState[date] = true;
      }
      return newState;
    });
  };

  const handleSelectAllDay = () => {
    const isAllSelected = DATA_LEAVE.every((item) => dataDayLeave?.[item.date]);
    if (isAllSelected) {
      setDataDayLeave({});
    } else {
      const allSelected: Record<string, boolean> = {};
      DATA_LEAVE.forEach((item) => {
        allSelected[item.date] = true;
      });
      setDataDayLeave(allSelected);
    }
  };

  const renderListItem = DATA_LEAVE.map((item) => (
    <ListItem key={item.date}>
      <TouchableOpacity onPress={() => handlePressButtonListItem(item.date)}>
        <View style={styles.containerBaseListItem}>
          <View style={styles.containerListItem}>
            <Badge value="1" color="info" />
            <View>
              <Typography
                variant="t2"
                weight="semibold"
                color={Color.gray[900]}
              >
                Senin
              </Typography>
              <Typography variant="t2" weight="regular" color={Color.gray[700]}>
                {item.date}
              </Typography>
            </View>
          </View>
          <CheckBox checked={!!dataDayLeave[item.date]} />
        </View>
      </TouchableOpacity>
    </ListItem>
  ));

  return (
    <Container>
      <View style={styles.containerHeader}>
        <View>
          <Typography variant="t2" weight="semibold" color={Color.gray[900]}>
            Pilih Tanggal
          </Typography>
          <Typography variant="t3" weight="medium" color={Color.gray[600]}>
            Silahkan pilih hari yang akan disetujui.
          </Typography>
        </View>
        <Button
          variant="tertiary"
          color="danger"
          title="Pilih Semua"
          onPress={handleSelectAllDay}
        />
      </View>

      <View style={styles.wrapperList}>
        <List style={hasError ? styles.listError : undefined}>
          {renderListItem}
        </List>
        {hasError && (
          <Typography variant="t3" weight="medium" color={Color.danger[500]}>
            Tanggal yang disetujui belum dipilih
          </Typography>
        )}
      </View>

      <BottomSheet isOpen={isOpenBottomSheetConfirmSubmit}>
        <View style={styles.sheetContent}>
          <View style={styles.sheetText}>
            <Typography
              center
              variant="p2"
              weight="semibold"
              color={Color.gray[900]}
            >
              Apakah Kamu yakin ingin menyetujui pengajuan ini?
            </Typography>
            <Typography
              center
              variant="t1"
              weight="regular"
              color={Color.gray[600]}
            >
              Pengajuan ini akan diproses setelah disetujui.
            </Typography>
          </View>
          <View style={styles.sheetButtons}>
            <Button
              color="primary"
              title="Yaa, Setujui Pengajuan"
              onPress={() => {
                setIsOpenSuccessModal(true);
                setIsOpenBottomSheetConfirmSubmit(false);
              }}
            />
            <Button
              color="primary"
              variant="tertiary"
              title="Cek Kembali"
              onPress={() => setIsOpenBottomSheetConfirmSubmit(false)}
            />
          </View>
        </View>
      </BottomSheet>

      <Modal
        onClose={() => setIsOpenSuccessModal(false)}
        closable={false}
        isOpen={isOpenSuccessModal}
      >
        <Container>
          <View style={styles.containerModalSuccess}>
            <Image source={require('../../../assets/positive-vote-1.png')} />
            <View>
              <Center style={styles.modalText}>
                <Typography
                  variant="p2"
                  weight="semibold"
                  color={Color.gray[800]}
                >
                  Berhasil dibuat
                </Typography>
                <Typography
                  variant="t2"
                  weight="regular"
                  color={Color.gray[500]}
                >
                  Data pengajuan Cuti berhasil dibuat.
                </Typography>
              </Center>
            </View>
            <Button
              title="Selesai"
              variant="tertiary"
              block
              color="primary"
              onPress={() => navigation.replace('LeaveDetail')}
            />
          </View>
        </Container>
      </Modal>

      <Footer>
        <Container>
          <Button
            title="Setujui Pengajuan"
            color="primary"
            onPress={handleApproveLeave}
          />
        </Container>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerListItem: {
    flexDirection: 'row',
    gap: 8,
  },
  containerBaseListItem: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  containerModalSuccess: {
    gap: 32,
    alignItems: 'center',
  },
  wrapperList: {
    gap: 4,
  },
  listError: {
    borderColor: Color.danger[500],
    borderWidth: 1,
    borderRadius: 6,
  },
  sheetContent: {
    gap: 8,
  },
  sheetText: {
    gap: 4,
  },
  sheetButtons: {
    gap: 10,
  },
  modalText: {
    gap: 4,
  },
});
