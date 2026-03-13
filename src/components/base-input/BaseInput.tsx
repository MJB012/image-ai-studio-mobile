import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { TextInput, Text, View, TextInputProps, StyleSheet, TouchableOpacity } from 'react-native';
import { useField } from 'formik';

interface BaseInputProps extends Omit<TextInputProps, 'value' | 'onChangeText' | 'onBlur'> {
  name: string;
  label?: string;
  leftIcon?: React.ReactNode;
}

const BaseInput: React.FC<BaseInputProps> = ({
  name,
  label,
  leftIcon,
  secureTextEntry,
  style,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const [isSecure, setIsSecure] = useState(!!secureTextEntry);
  const hasError = meta.touched && meta.error;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, hasError && styles.inputWrapperError]}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, style]}
          value={field.value}
          onChangeText={(text) => helpers.setValue(text)}
          onBlur={() => helpers.setTouched(true)}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={isSecure}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsSecure((prev) => !prev)}
            activeOpacity={0.6}
          >
            <MaterialIcons
              name={isSecure ? 'visibility-off' : 'visibility'}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>
      {hasError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  inputWrapperError: {
    borderColor: '#ef4444',
  },
  iconContainer: {
    paddingLeft: 12,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000',
  },
  eyeIcon: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
  },
});

export default BaseInput;
