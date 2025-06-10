import { View, Image, Text, StyleSheet } from 'react-native';
import { Icon } from '../Icon';
import Color from '../Color/Color';
import type { AvatarGroupProps, AvatarSizeType } from './type';

const SIZE_MAP: Record<AvatarSizeType, number> = {
  small: 30,
  medium: 40,
  large: 50,
};

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars = [],
  maxVisible = 5,
  size = 'medium',
}) => {
  const avatarSize = SIZE_MAP[size] || SIZE_MAP.medium;
  const visibleAvatars = avatars.slice(0, maxVisible);
  const remainingCount = avatars.length - maxVisible;

  return (
    <View style={[styles.container, { height: avatarSize }]}>
      {visibleAvatars.map((avatar, index) => {
        const hasImage = avatar.source;
        const initials = avatar.name;
        const styleSize = {
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
        };

        return (
          <View
            key={index}
            style={[
              styles.avatarWrapper,
              {
                left: index * (avatarSize * 0.6),
                zIndex: avatars.length - index,
              },
            ]}
          >
            {hasImage ? (
              <Image
                source={avatar.source}
                style={[styles.avatar, styleSize]}
              />
            ) : initials ? (
              <View style={[styles.initialWrapper, styleSize]}>
                <Text
                  style={[styles.initialText, { fontSize: avatarSize * 0.4 }]}
                >
                  {initials}
                </Text>
              </View>
            ) : (
              <View style={[styles.iconWrapper, styleSize]}>
                <Icon name="User" color={Color.base.white100} />
              </View>
            )}
          </View>
        );
      })}

      {remainingCount > 0 && (
        <View
          style={[
            styles.avatarWrapper,
            { left: visibleAvatars.length * (avatarSize * 0.6), zIndex: 0 },
          ]}
        >
          <View
            style={[
              styles.remaining,
              {
                width: avatarSize,
                height: avatarSize,
                borderRadius: avatarSize / 2,
              },
            ]}
          >
            <Text
              style={[styles.remainingText, { fontSize: avatarSize * 0.4 }]}
            >
              +{remainingCount}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
  },
  avatarWrapper: {
    position: 'absolute',
  },
  avatar: {
    borderWidth: 2,
    borderColor: Color.base.white100,
  },
  initialWrapper: {
    backgroundColor: Color.gray[400],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Color.base.white100,
  },
  iconWrapper: {
    backgroundColor: Color.gray[400],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Color.base.white100,
  },
  initialText: {
    color: Color.base.white100,
    fontWeight: 'bold',
  },
  remaining: {
    backgroundColor: Color.gray[400],
    justifyContent: 'center',
    alignItems: 'center',
  },
  remainingText: {
    color: Color.base.white100,
    fontWeight: 'bold',
  },
});

export default AvatarGroup;
