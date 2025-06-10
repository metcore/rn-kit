// App.js
import { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import {
  Alert,
  Badge,
  BottomSheet,
  Button,
  Calendar,
  Card,
  Center,
  Color,
  Container,
  Footer,
  InputFile,
  List,
  ListItem,
  Modal,
  Step,
  Typography,
} from '@herca/ui-kit';
import { StepItem } from '@herca/ui-kit';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../../type/navigation';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    leave_name: 'Sakit Dengan Surat Dokter',
    max_day: 1,
  },
  {
    id: 'bd7acbea-c1b1-426c2-aed5-3ad53abb28ba',
    leave_name: 'Cuti Nikah',
    max_day: 20,
  },
  {
    id: 'bd7acbea-c1b1-42622-aed5-3ad53abb28ba',
    leave_name: 'Cuti Nikah',
    max_day: 20,
  },
  {
    id: 'bd7acbea-czb1-426c2-aed5-3ad53abb28ba',
    leave_name: 'Cuti Nikah',
    max_day: 20,
  },
  {
    id: 'bd7acbea-cz3-426c2-aed5-3ad53abb28ba',
    leave_name: 'Cuti Nikah',
    max_day: 20,
  },
  {
    id: 'bd7acbea-czb1-42c2-aed5-3ad53abb28ba',
    leave_name: 'Cuti Nikah',
    max_day: 20,
  },
  {
    id: 'bd7acbea-czb1-242c2-aed5-3ad53abb28ba',
    leave_name: 'Cuti Nikah',
    max_day: 20,
  },
  {
    id: 'bd7a1cbea-czb1-42c2-aed5-3ad53abb28ba',
    leave_name: 'Cuti Nikah',
    max_day: 20,
  },
  {
    id: 'bd73acbea-czb1-42c2-aed5-3ad53abb28ba',
    leave_name: 'Cuti Nikah',
    max_day: 20,
  },
  {
    id: 'bd7acbe3a-czb1-42c2-aed5-3ad53abb28ba',
    leave_name: 'Cuti Nikah',
    max_day: 20,
  },
  {
    id: 'bd7acbea-czb1-42c2-aed5-3ad531abb28ba',
    leave_name: 'Cuti Nikah',
    max_day: 20,
  },
];

interface DataCutiProps {
  id: string;
  leave_name: string;
  max_day: number;
}
export default function LeaveForm() {
  const navigation = useNavigation<NavigationProps>();
  const [current, setCurrent] = useState(0);
  const [selectedLeave, setSelectedLeave] = useState<string>();
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [isOpenConrimSubmitBottomSheet, setIsOpenConrimSubmitBottomSheet] =
    useState(false);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [dayType, setDayType] = useState<number>();
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);

  const handleNextStep = () => {
    if (current == 0 && !dayType) {
      setIsOpenBottomSheet(true);
    } else {
      setIsOpenBottomSheet(false);
      setCurrent((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleChangeStep = (val: number) => {
    console.log(val);
  };

  const handlePressHalfDay = (val: number) => {
    setDayType(val);
  };

  const handleSubmit = () => {
    setIsSuccessSubmit(true);
    setIsOpenConrimSubmitBottomSheet(false);
    setIsOpenSuccessModal(true);
  };

  const handleOnPressBottomSheetDayType = () => {
    if (dayType) {
      setIsOpenConrimSubmitBottomSheet(false);
      setCurrent((prev) => Math.min(prev + 1, 3));
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!isSuccessSubmit && current > 0) {
        e.preventDefault();
        setCurrent(current - 1);
      }
    });

    return unsubscribe;
  }, [navigation, current, isSuccessSubmit]);

  const Item = ({ item }: { item: DataCutiProps }) => (
    <TouchableOpacity
      onPress={() => setSelectedLeave(item.id)}
      style={{ gap: 8, flex: 1 }}
    >
      <Card
        style={[
          {
            marginBottom: 8,
            gap: 8,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          },
          selectedLeave == item.id && {
            backgroundColor: Color.primary[50],
            borderColor: Color.primary[300],
          },
        ]}
      >
        <Badge color="info">
          <Typography variant="t2" weight="medium" color={Color.info[500]}>
            {item.max_day}
          </Typography>
          <Typography variant="t3" weight="medium" color={Color.info[400]}>
            Hari
          </Typography>
        </Badge>
        <Typography weight="semibold" variant="t2" color={Color.gray[800]}>
          {item.leave_name}
        </Typography>
      </Card>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (current == 3) {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ justifyContent: 'center' }}>
            <Typography variant="t2" weight="medium" color={Color.gray[500]}>
              Pengajuan Cuti
            </Typography>
            <Typography variant="t1" weight="semibold" color={Color.gray[800]}>
              25 Des 2024 (1 Hari)
            </Typography>
          </View>
          <Button
            color="primary"
            title="Simpan"
            onPress={() => setIsOpenConrimSubmitBottomSheet(true)}
          />
        </View>
      );
    }
    return (
      <Button title="Lanjutkan" color="primary" onPress={handleNextStep} />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Step current={current} onChangeStep={handleChangeStep}>
        <StepItem title="Step 1">
          <Container>
            <Typography variant="t2" weight="semibold" color={Color.gray[800]}>
              Tipe Cuti
            </Typography>
            <FlatList
              data={DATA}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item.id}
            />
          </Container>
        </StepItem>
        <StepItem title="Step 2">
          <Container>
            <Typography variant="t2" weight="semibold" color={Color.gray[800]}>
              Pilih Tanggal
            </Typography>
            <Card>
              <Calendar />
            </Card>
            <Alert
              message="Sisa cuti taghunanmu untuk tanggal yang dipilih ada 10 hari"
              color="warning"
            />
          </Container>
        </StepItem>
        <StepItem title="Step 3">
          <Container>
            <InputFile
              title="Upload KTP"
              description="Format JPG atau PDF maksimal 2MB"
              maxFileSize={2}
              accept={['image/jpeg', 'application/pdf']}
              multiple={false}
              onChange={(files) => console.log('Uploaded files:', files)}
            />
          </Container>
        </StepItem>
        <StepItem title="Step 4">
          <ScrollView>
            <Container style={{ gap: 12 }}>
              <Alert
                color="info"
                message="Pastikan data yang kamu masukan sudah benar sebelum melanjutkan pengajuan."
              />
              <List>
                <ListItem>
                  <Typography
                    variant="t2"
                    weight="regular"
                    color={Color.gray[600]}
                  >
                    Tipe Pengajuan
                  </Typography>
                  <Typography
                    variant="t2"
                    weight="semibold"
                    color={Color.gray[800]}
                  >
                    25 Des 2024 (1 Hari)
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography
                    variant="t2"
                    weight="regular"
                    color={Color.gray[600]}
                  >
                    Tipe Cuti
                  </Typography>
                  <Typography
                    variant="t2"
                    weight="semibold"
                    color={Color.gray[800]}
                  >
                    Cuti Tahunan
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography
                    variant="t2"
                    weight="regular"
                    color={Color.gray[600]}
                  >
                    Permintaan Cuti
                  </Typography>
                  <Typography
                    variant="t2"
                    weight="semibold"
                    color={Color.gray[800]}
                  >
                    Cuti Setengah Hari (09:00 - 12:01)
                  </Typography>
                </ListItem>
              </List>
              <Typography variant="t2" weight="medium" color={Color.gray[600]}>
                Dokumen
              </Typography>
              <List>
                <ListItem>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Image
                      source={require('../../../assets/leave/type_cuti1.png')}
                      style={{ width: 44, height: 44, borderRadius: 8 }}
                    />
                    <View style={{ justifyContent: 'center' }}>
                      <Typography
                        variant="t1"
                        weight="semibold"
                        color={Color.gray[600]}
                      >
                        Image.png
                      </Typography>
                      <Typography
                        variant="t2"
                        weight="regular"
                        color={Color.gray[600]}
                      >
                        Image.png
                      </Typography>
                    </View>
                  </View>
                </ListItem>
                <ListItem>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Image
                      source={require('../../../assets/leave/type_cuti1.png')}
                      style={{ width: 44, height: 44, borderRadius: 8 }}
                    />
                    <View style={{ justifyContent: 'center' }}>
                      <Typography
                        variant="t1"
                        weight="semibold"
                        color={Color.gray[600]}
                      >
                        Image.png
                      </Typography>
                      <Typography
                        variant="t2"
                        weight="regular"
                        color={Color.gray[600]}
                      >
                        Image.png
                      </Typography>
                    </View>
                  </View>
                </ListItem>
                <ListItem>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Image
                      source={require('../../../assets/leave/type_cuti1.png')}
                      style={{ width: 44, height: 44, borderRadius: 8 }}
                    />
                    <View style={{ justifyContent: 'center' }}>
                      <Typography
                        variant="t1"
                        weight="semibold"
                        color={Color.gray[600]}
                      >
                        Image.png
                      </Typography>
                      <Typography
                        variant="t2"
                        weight="regular"
                        color={Color.gray[600]}
                      >
                        Image.png
                      </Typography>
                    </View>
                  </View>
                </ListItem>
              </List>
              <Typography variant="t2" weight="medium" color={Color.gray[600]}>
                Catatan
              </Typography>
              <Card>
                <Typography
                  variant="t2"
                  weight="regular"
                  color={Color.gray[600]}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec
                  dictum viverra consequat vitae urna. Integer quis lobortis
                  ullamcorper dui. Curabitur et libero non urna aliquet accumsan
                  vitae eget magna. Sed vitae lacinia dolor. Vestibulum primis
                  in faucibus orci luctus et ultrice posuere cubilia curae.
                </Typography>
              </Card>
            </Container>
          </ScrollView>
        </StepItem>
      </Step>
      <Footer>
        <Container>{renderFooter()}</Container>
      </Footer>
      <BottomSheet
        isOpen={isOpenBottomSheet}
        footer={
          <Button color="primary" title="Lanjutkan" onPress={handleNextStep} />
        }
        onClose={() => setIsOpenBottomSheet(false)}
      >
        <View style={{ flexDirection: 'row', gap: 18 }}>
          <TouchableOpacity
            onPress={() => handlePressHalfDay(1)}
            style={{ height: 200, flex: 1 }}
          >
            <Card
              backgroundImage={require('../../../assets/leave/type_cuti1.png')}
              style={{ flex: 1 }}
            >
              <Typography
                variant="p3"
                weight="semibold"
                color={Color.gray[600]}
              >
                Satu Hari Penuh
              </Typography>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePressHalfDay(2)}
            style={{ height: 200, flex: 1 }}
          >
            <Card
              backgroundImage={require('../../../assets/leave/type_cuti1.png')}
              style={{ flex: 1 }}
            >
              <Typography
                variant="p3"
                weight="semibold"
                color={Color.gray[600]}
              >
                Setengah Hari
              </Typography>
            </Card>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      <BottomSheet
        isOpen={isOpenConrimSubmitBottomSheet}
        onClose={() => setIsOpenConrimSubmitBottomSheet(false)}
      >
        <View style={{ gap: 8 }}>
          <Typography variant="p2" weight="semibold" color={Color.gray[800]}>
            Apakah Kamu yakin ingin membuat Pengajuan Cuti?
          </Typography>
          <Typography variant="t1" weight="regular" color={Color.gray[500]}>
            Pastikan data yang Kamu masukkan sudah benar sebelum melanjutkan
            Pengajuan.
          </Typography>
          <Button
            title="Yaa, Buat Pengajuan"
            color="primary"
            onPress={handleSubmit}
          />
          <Button
            title="Cek Kembali"
            variant="tertiary"
            color="primary"
            onPress={() => handleOnPressBottomSheetDayType()}
          />
        </View>
      </BottomSheet>

      <Modal
        onClose={() => setIsOpenSuccessModal(false)}
        isOpen={isOpenSuccessModal}
      >
        <Container>
          <View style={{ gap: 32, alignItems: 'center' }}>
            <Image source={require('../../../assets/positive-vote-1.png')} />
            <View>
              <Center style={{ gap: 4 }}>
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
    </SafeAreaView>
  );
}
