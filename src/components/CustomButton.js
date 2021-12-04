import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function CustomButton({
  onPress,
  label = '',
  buttonStyle,
  textColor,
  disabled
}) {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={disabled}>
      <Text style={textColor}>{label.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

