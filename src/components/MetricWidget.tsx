import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './Card';
import { Theme } from './Theme';

interface MetricWidgetProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}

export const MetricWidget = ({ title, value, subtitle, color = Theme.colors.primary }: MetricWidgetProps) => {
  return (
    <Card style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: Theme.spacing.xs,
  },
  title: {
    color: Theme.colors.textMuted,
    fontSize: 14,
    marginBottom: Theme.spacing.xs,
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Theme.colors.textMuted,
    fontSize: 12,
    marginTop: Theme.spacing.xs,
  }
});
