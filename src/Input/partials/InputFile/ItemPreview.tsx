import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Card from '../../../Ui/Card';
import Color from '../../../Color/Color';
import Typography from '../../../Typography/Typography';
import Icon from '../../../Icon';

interface Props {
  file: any;
  onPress: () => void;
  index: number;
  onReplace: (index: number) => void;
  onDelete: (index: number) => void;
  variant?: 'default' | 'small';
}

export default function ItemPreview({
  file,
  onPress,
  index,
  onDelete,
  onReplace,
  variant = 'default',
}: Props) {
  const Wrapper = variant === 'default' ? Card : View;

  return (
    <Wrapper>
      <TouchableOpacity
        onPress={onPress}
        style={styles.containerPreview}
        activeOpacity={0.7}
      >
        <View style={styles.containerListItem}>
          {file.type.startsWith('image') && (
            <View
              style={
                (variant === 'small' ? styles.previewImageSmall : {},
                variant === 'small' && file.error
                  ? styles.previewImageError
                  : {})
              }
            >
              {variant === 'small' && (
                <BtnIcon onPress={() => onDelete(index)} />
              )}

              <Image
                source={{ uri: file.uri }}
                style={[
                  styles.previewImage,
                  variant === 'small' && file.error
                    ? styles.previewImageSmallError
                    : {},
                ]}
              />
            </View>
          )}

          {!file.type.startsWith('image') && (
            <View
              style={[
                styles.previewImage,
                variant === 'small' ? styles.previewImageSmall : {},
                variant === 'small' && file.error
                  ? styles.previewImageError
                  : {},
              ]}
            >
              {variant === 'small' && (
                <BtnIcon onPress={() => onDelete(index)} />
              )}

              <Icon
                name={file.type === 'application/pdf' ? 'pdf-file' : 'Document'}
                size={file.type === 'application/pdf' ? 32 : 24}
                color={Color.primary[1000]}
              />
            </View>
          )}

          {variant === 'default' && (
            <View style={styles.fileDetails}>
              <Typography
                variant="t1"
                weight="semibold"
                color={Color.gray[600]}
                numberOfLines={1}
              >
                {file.name || `Image_${index + 1}`}
              </Typography>

              <Typography variant="t2" weight="regular" color={Color.gray[600]}>
                {((file?.size ?? file?.fileSize ?? 0) / (1024 * 1024)).toFixed(
                  2
                )}
                MB
              </Typography>
            </View>
          )}
        </View>

        {/* action default */}
        {variant === 'default' && (
          <View style={styles.action}>
            {file.error && (
              <Icon
                name="exclamation-triangle"
                color={Color.danger[500]}
                size={20}
              />
            )}

            <TouchableOpacity onPress={() => onReplace(index)}>
              <Icon name="rotate-right" size={18} color={Color.gray[700]} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onDelete(index)}>
              <Icon name="Times" size={12} color={Color.gray[700]} />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </Wrapper>
  );
}

const BtnIcon = ({ onPress }: { onPress: () => any }) => {
  return (
    <TouchableOpacity
      style={styles.actionDelete}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Icon name="times-new" color="white" size={15} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  previewImage: {
    width: 48,
    height: 48,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  fileDetails: {
    justifyContent: 'center',
    gap: 4,
    flex: 1,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexShrink: 0,
  },

  // small
  previewImageSmall: {
    borderWidth: 1,
    borderColor: Color.gray[200],
    borderRadius: 6,
    position: 'relative',
  },
  previewImageError: {
    borderColor: Color.danger[500],
  },
  actionDelete: {
    position: 'absolute',
    top: 1.5,
    right: 1.5,
    backgroundColor: Color.primary[1000],
    zIndex: 1,
    padding: 2,
    borderRadius: 10,
  },
  previewImageSmallError: { borderWidth: 1, borderColor: Color.danger[500] },
});
