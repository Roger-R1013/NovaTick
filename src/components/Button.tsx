import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { Theme } from './Theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'danger' | 'info' | 'outline';
  loading?: boolean;
}

export const Button = ({ title, variant = 'primary', loading, style, disabled, ...props }: ButtonProps) => {
  const getBackgroundColor = () => {
    if (variant === 'outline') return 'transparent';
    if (variant === 'danger') return Theme.colors.danger;
    if (variant === 'info') return Theme.colors.info;
    return Theme.colors.primary;
  };

  const getTextColor = () => {
    if (variant === 'outline') return Theme.colors.primary;
    return Theme.colors.text;
  };

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { backgroundColor: getBackgroundColor() },
        variant === 'outline' && styles.outline,
        (disabled || loading) && styles.disabled,
        style
      ]} 
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Theme.spacing.m,
    paddingHorizontal: Theme.spacing.l,
    borderRadius: Theme.borderRadius.m,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outline: {
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  }
});
