import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const LoginOptions = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onClick(props.type)}
      style={[styles.selectedbuttonLogin, { borderColor: props.border }]}
    >
      <Text style={styles.selectTextLogin}>{props.type}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectedbuttonLogin: {
    opacity: 1,
    borderRadius: 5,
    borderWidth: 1,
  },
  selectTextLogin: {
    color: 'rgba(255,255,255,1)',
    alignSelf: 'center',
    padding: 4,
  },
});
export default LoginOptions;
