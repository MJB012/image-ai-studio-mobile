import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface BaseButtonProps {
  label: string;
  className?: string;
  onPress?: () => void;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  label,
  className,
  onPress,
}) => {
  return (
    <TouchableOpacity
      className={`bg-primary py-2.5 px-4 rounded items-center justify-center ${className ?? ''}`}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text className="text-white font-medium text-base">{label}</Text>
    </TouchableOpacity>
  );
};

export default BaseButton;
