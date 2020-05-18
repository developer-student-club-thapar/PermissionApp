import React, { useReducer, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  RefreshControl,
} from 'react-native';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import { validate } from '../Validator';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true,
      };
    }
    case 'INITIAL': {
      return {
        ...state,
        value: action.val,
        isValid: false,
        isTouched: false,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isTouched: false,
    isValid: false,
  });

  // useEffect(() => {
  // 	onInput(id, value, isValid);
  // }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };
  const { id, onInput, afterSubmit } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    dispatch({
      type: 'INITIAL',
      val: '',
    });
  }, [afterSubmit]);

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  return (
    <View style={styles.col9} id={props.id}>
      <View
        style={[
          styles.rect9,
          !inputState.isValid && inputState.isTouched && styles.inValidClass,
        ]}
      >
        <EvilIconsIcon
          name={props.iconName}
          style={styles.iconUser}
        ></EvilIconsIcon>
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor="rgba(255,255,255,1)"
          secureTextEntry={props.secureTextEntry}
          style={styles.usernameInput}
          value={inputState.value}
          onChangeText={changeHandler}
          onBlur={touchHandler}
        ></TextInput>
      </View>
      {!inputState.isValid && inputState.isTouched && (
        <Text style={styles.invalidText}>{props.errorText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rect9: {
    backgroundColor: 'rgba(251,247,247,0.25)',
    opacity: 1,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    width: '100%',
  },
  inValidClass: {
    borderColor: 'red',
    borderBottomWidth: 3,
  },
  invalidText: {
    color: 'red',
  },
  col9: {
    flexDirection: 'column',
    marginBottom: '5%',
  },
  iconUser: {
    color: 'rgba(255,255,255,1)',
    fontSize: 30,
    marginLeft: 20,
    alignSelf: 'center',
  },
  usernameInput: {
    color: 'rgba(255,255,255,1)',
  },
});
export default Input;
