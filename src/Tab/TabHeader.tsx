import { Pressable, View } from 'react-native';
import Typography from '../Typography/Typography';
import Color from '../Color/Color';

export default function TabHeader({ isFocused }) {
  const handleOnpress = () => {};
  return (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: Color.gray[100],
      }}
    >
      <Pressable
        onPress={handleOnpress}
        style={{
          margin: 4,
          paddingVertical: 6,
          backgroundColor: isFocused ? Color.primary[1000] : Color.gray[100],
          borderRadius: 8,
        }}
      >
        <Typography
          variant="t2"
          weight="semibold"
          color={isFocused ? Color.base.white100 : Color.gray[700]}
        >
          tes
        </Typography>
      </Pressable>
    </View>
  );
}
