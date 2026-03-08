import React from 'react';
import { Pressable as NativePressable, PressableProps, View, Platform } from 'react-native';

export const ResponsiveButton = React.forwardRef<View, PressableProps>((props, ref) => {
  return (
    <NativePressable
      {...props}
      ref={ref}
      style={(state) => {
        const baseStyle = typeof props.style === 'function' ? props.style(state) : props.style;
        const isHovered = Platform.OS === 'web' ? (state as any).hovered : false;
        
        return [
          baseStyle,
          (state.pressed || isHovered) && { opacity: 0.6 }
        ];
      }}
    />
  );
});

ResponsiveButton.displayName = 'ResponsiveButton';
