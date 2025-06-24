import React from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color, Container, Icon, Typography } from '@herca/rn-kit';

interface HeaderNavigationProps {
  title: string;
  showBackButton?: boolean;
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  title,
  showBackButton = true,
}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Container>
        <View style={styles.header}>
          {showBackButton && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.leftButton}
            >
              <Icon name="ArrowLeft" size={20} color={Color.gray[900]} />
            </TouchableOpacity>
          )}

          <Typography variant="p2" weight="semibold" style={styles.title}>
            {title}
          </Typography>

          <TouchableOpacity style={styles.rightButton}>
            <Icon name="Search" size={20} color={Color.gray[900]} />
          </TouchableOpacity>
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default HeaderNavigation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.base.white100,
    borderBottomWidth: 1,
    borderBottomColor: Color.gray[50],
  },
  header: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  rightButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  title: {
    color: Color.gray[900],
  },
});
