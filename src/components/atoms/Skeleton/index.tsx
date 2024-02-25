import {Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';

interface ISkeletonProps {
  width: string | number;
  height: string | number;
  variant?: string;
  backgroundColor?: string;
  radius?: number;
  style?: any;
}

const Skeleton: React.FC<ISkeletonProps> = props => {
  const {
    width,
    height,
    variant = 'circle',
    backgroundColor = 'silver',
    radius,
    style,
  } = props;
  const opacity = useRef(new Animated.Value(0.3));

  let borderRadius = 0;

  if (variant === 'circle') {
    borderRadius =
      typeof height === 'string' ? parseInt(height, 10) / 2 : height / 2;
  }

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 800,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 800,
        }),
      ]),
    ).start();
  }, [opacity]);
  return (
    <Animated.View
      style={[
        style,
        {
          opacity: opacity.current,
          height: height,
          width: width,
          borderRadius: radius || borderRadius,
          backgroundColor: backgroundColor,
        },
      ]}
    />
  );
};

export default Skeleton;
