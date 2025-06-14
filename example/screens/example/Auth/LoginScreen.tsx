import {
  Button,
  Color,
  Container,
  Input,
  InputPassword,
  Typography,
} from '@herca/ui-kit';
import { useNavigation } from '@react-navigation/native';
import { Image, View } from 'react-native';
import { NavigationProps } from '../../../type/navigation';
import { useState } from 'react';

interface DataProps {
  email: string;
  password: string;
}
export default function LoginScreen() {
  const [data, setData] = useState<DataProps>();
  const [erroData, setErrorData] = useState();

  const handleOnChange = (name, val) => {
    setData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleOnPressSubmit = () => {
    setErrorData((prev) => ({
      ...prev,
      email: true,
    }));
    if (!data && !data?.password) {
      setErrorData((prev) => ({
        ...prev,
        password: true,
      }));
    }
  };
  const navigation = useNavigation<NavigationProps>();
  return (
    <Container>
      <View style={{ gap: 16 }}>
        <View style={{ gap: 24 }}>
          <View style={{ gap: 32 }}>
            <Image source={require('../../../assets/logo.png')} />
            <View style={{ gap: 4 }}>
              <Typography
                variant="h4"
                weight="semibold"
                color={Color.gray[900]}
              >
                Hallo, Selamat Datang di Herca HRIS
              </Typography>
              <Typography variant="t1" weight="regular" color={Color.gray[600]}>
                Masukan akun kamu yang telah didaftarkan.
              </Typography>
            </View>
          </View>
          <View style={{ gap: 8 }}>
            <Input
              label="Email"
              placeholder="Masukan email Milikmu"
              hasError={erroData?.email}
              hint="Wrong Password"
              onChangeText={(val) => handleOnChange('email', val)}
            />
            <InputPassword
              label="Kata sandi"
              placeholder="Masukan kanta sandi kamu"
              onChangeText={(val) => handleOnChange('password', val)}
            />
          </View>
          <View style={{ alignContent: 'flex-end' }}>
            <Button
              variant="tertiary"
              color="info"
              title="Lupa Kata Sandi ?"
              onPress={() => navigation.navigate('ForgotPassword')}
            />
          </View>
        </View>

        <View style={{ gap: 16 }}>
          <Button
            title="Masuk"
            disabled={data && data?.email && data.password ? false : true}
            color="primary"
            size="medium"
          />
          <Typography
            variant="t2"
            weight="medium"
            color={Color.gray[700]}
            center
          >
            Atau masuk dengan
          </Typography>
          <Button
            variant="outline"
            title="Face ID"
            color="primary"
            size="medium"
            onPress={handleOnPressSubmit}
          />
        </View>
      </View>
    </Container>
  );
}
