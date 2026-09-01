import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { Theme } from './Theme';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export const Card = ({ children, style, ...props }: CardProps) => {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.m,
    padding: Theme.spacing.m,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    shadowColor: Theme.colors.background,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
