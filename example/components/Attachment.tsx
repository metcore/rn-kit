import { Color, Icon, List, ListItem, Typography } from '@herca/kit';
import {
  Image,
  StyleSheet,
  View,
  type ImageSourcePropType,
} from 'react-native';

interface AttachmentProps {
  data: ImageSourcePropType[];
}
export default function Attachment({ data }: AttachmentProps) {
  return (
    <List>
      {data.map((image: ImageSourcePropType, index: number) => (
        <ListItem key={index}>
          <View style={styles.containerListItem}>
            <Image source={image} style={styles.image} />
            <View style={styles.containerAttachmentLabel}>
              <View style={{ gap: 8 }}>
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
              <Icon
                name="ArrowRight"
                color={Color.gray[500]}
                size={15}
                style={styles.icon}
              />
            </View>
          </View>
        </ListItem>
      ))}
    </List>
  );
}

const styles = StyleSheet.create({
  containerListItem: {
    flexDirection: 'row',
    gap: 8,
  },
  containerAttachmentLabel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    alignSelf: 'center',
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 8.25,
  },
});
