import { Color, Container, Input, Typography } from '@herca/rn-kit';
import { useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

export default function InputScreen() {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <Container style={styles.container}>
          <Input
            label="Basic"
            placeholder="Type here ..."
            required
            ref={inputRef}
          />
          <Input
            icon="User"
            label="With Left Icon"
            placeholder="Type here ..."
          />
          <Input
            icon="User"
            iconRight="Eye"
            label="With Right Icon"
            placeholder="Type here ..."
            clearButton={true}
          />

          <Input
            label="On Click Icon"
            icon="User"
            iconRight="Search"
            placeholder="Type Here ... "
            clearButton
            onPressIconLeft={() => console.log('Kiri')}
            onPressIconRight={() => console.log('Kanan')}
          />
          <Input
            icon="User"
            label="With Clear Button"
            placeholder="Type here ..."
            clearButton={true}
          />
          <Input
            icon="User"
            label="With Hint"
            placeholder="Type here ..."
            clearButton={true}
            hint="Masukan angka 50 karakter"
          />
          <Input
            icon="User"
            label="Has Error"
            placeholder="Type here ..."
            clearButton={true}
            hasError={true}
            hint="Masukan angka 50 karakter"
          />

          <Input
            label="On Click Icon With Custom Icon Color"
            icon="Search"
            iconRight="Scanner"
            placeholder="Type Here ... "
            clearButton
            onPressIconLeft={() => console.log('Kiri')}
            onPressIconRight={() => console.log('Kanan')}
            iconRightColor={Color.primary[950]}
          />

          <Input
            label="Input With Prefix"
            prefix={
              <View style={styles.countryCode}>
                <Typography variant="t2" weight="semibold">
                  +62
                </Typography>
              </View>
            }
            placeholder="Type Here ... "
            clearButton
            onPressIconLeft={() => console.log('Kiri')}
            onPressIconRight={() => console.log('Kanan')}
          />
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  countryCode: {
    borderWidth: 1,
    borderColor: Color.gray[100],
    borderRadius: 16,
    paddingHorizontal: 8,
  },
  container: {
    gap: 12,
  },
});
