
import React, { useEffect, useRef } from 'react';
import { Animated, LayoutChangeEvent, StyleSheet } from 'react-native';
import { ThemedView, ThemedViewProps } from './themed-view';

type CollapsibleProps = ThemedViewProps & {
  isCollapsed: boolean;
  children?: React.ReactNode;
  duration?: number;
};

export const Collapsible = ({
  isCollapsed,
  children,
  style,
  duration = 250,
  ...otherProps
}: CollapsibleProps) => {
  const animatedHeight = useRef(new Animated.Value(isCollapsed ? 0 : 1)).current;
  const contentHeight = useRef(0);
  const measured = useRef(false);

  useEffect(() => {
    if (!measured.current) return; // do not animate until measured
    Animated.timing(animatedHeight, {
      toValue: isCollapsed ? 0 : 1,
      duration,
      useNativeDriver: false,
    }).start();
  }, [isCollapsed, duration, animatedHeight]);

  const handleLayout = (event: LayoutChangeEvent) => {
    if (!measured.current) {
      contentHeight.current = event.nativeEvent.layout.height;
      animatedHeight.setValue(isCollapsed ? 0 : 1); // correct height at mount
      measured.current = true;
    }
  };

  const height = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight.current],
  });

  // Use pointerEvents so collapsed section does not capture taps
  return (
    <Animated.View
      style={[styles.collapsible, style, measured.current && { height }]}
      pointerEvents={isCollapsed ? 'none' : 'auto'}
      {...otherProps}
    >
      {/* We only measure once for initial children layout */}
      <ThemedView
        onLayout={handleLayout}
        style={measured.current ? undefined : { position: 'absolute', opacity: 0, zIndex: -1, width: '100%' }}
      >
        {children}
      </ThemedView>
      {/* Render children only when measured, so content is shown/collapsed */}
      {measured.current && children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  collapsible: {
    overflow: 'hidden',
    width: '100%',
  },
});
