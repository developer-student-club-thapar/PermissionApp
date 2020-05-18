import React, { useState, useReducer, useEffect } from 'react';
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment, { isMoment } from 'moment';

//function to handle dispatch functions of useReducer Hook.
const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
        isTouched: true,
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
        isTouched: false,
        isValid: false,
      };
    }
    default:
      return state;
  }
};

//Main function for selecting date
const Date = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isTouched: false,
    isValid: false,
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  // useEffect(() => {
  // 	if (isDatePickerVisible) {
  // 		dispatch({ type: "TOUCH" });
  // 	}
  // }, [isDatePickerVisible]);

  const hideDatePicker = (date) => {
    setDatePickerVisibility(false);
  };
  const hideDatePickerCancel = () => {
    setDatePickerVisibility(false);
    dispatch({
      type: 'CHANGE',
      val: inputState.value,
      validators: props.validators,
    });
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    dispatch({
      type: 'CHANGE',
      val: moment(date).format('MMMM, Do YYYY'),
      validators: props.validators,
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

  //JSX element to the main function
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
        <TouchableOpacity onPress={showDatePicker}>
          {inputState.value != '' && (
            <Text style={styles.editText}> {inputState.value}</Text>
          )}
          {inputState.value == '' && (
            <Text style={styles.editText}>{props.holder}</Text>
          )}
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePickerCancel}
          isDarkModeEnabled={true}
        />
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
  editText: {
    color: 'white',
  },
});
export default Date;
