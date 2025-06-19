import { BottomSheet, Button, Card, Color, Typography } from '@herca/kit';
import { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  type GestureResponderEvent,
} from 'react-native';
import type { DateRangeProps } from '../../../src/Calendar/CalendarPropsType';

interface SelectDayLeaveProps {
  isOpen: boolean;
  onSubmit: () => (value: DateRangeProps) => void;
}

export default function SelectDayLeave({
  isOpen,
  onSubmit,
}: SelectDayLeaveProps) {
  const [dayType, setDayType] = useState<number | any>();
  const handlePressHalfDay = (val: GestureResponderEvent) => {
    setDayType(val);
  };

  const handleOnSubmit = () => {
    onSubmit?.(dayType);
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      footer={
        <Button color="primary" title="Lanjutkan" onPress={handleOnSubmit} />
      }
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => handlePressHalfDay(1)}
          style={styles.button}
        >
          <Card
            backgroundImage={require('../../assets/leave/type_cuti1.png')}
            style={[
              styles.card,
              dayType === 1 && {
                borderColor: Color.success[500],
                borderWidth: 1,
              },
            ]}
          >
            <Typography variant="p3" weight="semibold" color={Color.gray[600]}>
              Satu Hari Penuh
            </Typography>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePressHalfDay(2)}
          style={styles.button}
        >
          <Card
            backgroundImage={require('../../assets/leave/type_cuti1.png')}
            style={[
              styles.card,
              dayType === 2 && {
                borderColor: Color.warning[500],
                borderWidth: 1,
              },
            ]}
          >
            <Typography variant="p3" weight="semibold" color={Color.gray[600]}>
              Setengah Hari
            </Typography>
          </Card>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 18,
    marginBottom: 20,
  },
  button: {
    height: 200,
    flex: 11,
  },
  card: {
    flex: 1,
  },
});
