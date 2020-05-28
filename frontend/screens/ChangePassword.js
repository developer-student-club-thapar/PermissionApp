//Change Password page

import React, {
  Component,
  useState,
  useEffect,
  useReducer,
  useCallback,
  useContext,
} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
} from 'react-native';
import Button from '../components/Button';
import AppHeader from '../components/navigation/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../components/context/auth-context';
import Input from '../components/ui/Input';
import { VALIDATOR_REQUIRE } from '../components/Validator';
import getEnvVars from '../environment';
const { apiUrl } = getEnvVars();

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };

    default:
      return state;
  }
};
const ChangePassword = (props) => {
  const [isTouched, setTouched] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const auth = useContext(AuthContext);
  const [errorReceived, setError] = useState('');
  const [formData, setFormData] = useState({});
  const [clicked, setClick] = useState(false);

  const onClickHandler = (index) => {
    setClick(true);
  };

  //to set the form Data object whenever value of clicked changes
  useEffect(() => {
    function func() {
      setFormData({
        oldPassword: formState.inputs.oldPassword.value,
        newPassword: formState.inputs.newPassword.value,
      });
    }
    if (
      clicked &&
      formState.inputs.newPassword.value ==
        formState.inputs.retypeNewPassword.value
    ) {
      func();
    }
  }, [clicked]);

  //to reset navigate to status page whenever form data changes and clicked is true.
  useEffect(() => {
    async function fetchData() {
      if (clicked) {
        //console.log(formData);
        try {
          setIsLoading(true);
          setSpinner(true);

          const response = await fetch(
            `http://${apiUrl}/api/users/changepassword/${auth.userId}`,
            {
              method: 'PATCH',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                prevPassword: formState.inputs.oldPassword.value,
                newPassword: formState.inputs.newPassword.value,
              }),
            },
          );
          const responseData = await response.json();
          console.log(responseData.message);

          if (responseData.message) {
            setError(responseData.message);
          } else {
            console.log('Password Updatedddd');
            setTouched(true);
            setError('');
          }
          //console.log(responseData);
        } catch (err) {
          console.log(err);
        }

        setClick(false);
        setSpinner(false);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [formData]);

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      oldPassword: {
        value: '',
        isValid: false,
      },
      newPassword: {
        value: '',
        isValid: false,
      },
      retypeNewPassword: {
        value: '',
        isValid: false,
      },
    },
    isValid: false,
  });

  //it will be triggered when value of id, value, isValid as the onInput function in the input.js component
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Spinner
        visible={spinner}
        textContent={''}
        color="white"
        textStyle={styles.spinnerTextStyle}
      />
      <AppHeader navigation={props.navigation} title="Permission Status" />

      <Text
        style={{
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          marginTop: '10%',
          fontSize: 18,
          backgroundColor: 'rgba(15,15, 15,0.7)',
          padding: 15,
        }}
      >
        Reset Password
      </Text>

      <View style={styles.innerContainer}>
        {errorReceived != '' && (
          <Text
            style={{
              fontWeight: 'bold',
              color: 'red',
              textAlign: 'center',
              paddingBottom: 6,
              fontSize: 14,
              backgroundColor: 'rgba(15,15, 15,0.7)',
            }}
          >
            {errorReceived}
          </Text>
        )}
        {errorReceived == '' && isTouched && (
          <Text
            style={{
              fontWeight: 'bold',
              color: 'green',
              textAlign: 'center',
              paddingBottom: 6,
              fontSize: 16,
              backgroundColor: 'rgba(15,15, 15,0.7)',
            }}
          >
            Password Updated!
          </Text>
        )}
        <Input
          iconName="lock"
          placeholder="Old Password"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Required!"
          onInput={inputHandler}
          afterSubmit={formData}
          id="oldPassword"
        />
        <Input
          iconName="lock"
          placeholder="New Password"
          secureTextEntry={true}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Required!"
          onInput={inputHandler}
          afterSubmit={formData}
          id="newPassword"
        />
        <Input
          iconName="lock"
          placeholder="Retype New Password"
          secureTextEntry={true}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Required!"
          onInput={inputHandler}
          afterSubmit={formData}
          id="retypeNewPassword"
        />
        {formState.inputs.newPassword.value !=
          formState.inputs.retypeNewPassword.value &&
          formState.inputs.retypeNewPassword.value != '' && (
            <Text
              style={{
                fontWeight: 'bold',
                color: 'red',
                textAlign: 'right',
                paddingBottom: 6,
                fontSize: 14,
                backgroundColor: 'rgba(15,15, 15,0.7)',
              }}
            >
              Password does not match!
            </Text>
          )}
        <Button
          buttonText="Reset"
          onClick={onClickHandler}
          color="rgba(95,0,14,1)"
          textColor="white"
          disabled={!formState.isValid}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'rgba(18,18,18,1)',
    width: '100%',
  },
  password: {
    height: 59,
    backgroundColor: 'rgba(253,251,251,0.25)',
    opacity: 1,
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 20,
  },
  iconPassword: {
    color: 'rgba(255,255,255,1)',
    fontSize: 33,
    marginLeft: 20,
    alignSelf: 'center',
  },
  passwordInput: {
    color: 'rgba(255,255,255,1)',
  },
  button: {
    height: 59,
    borderRadius: 11,
    borderColor: 'rgba(252,252,252,1)',
    borderWidth: 1,
  },
  spinnerTextStyle: {
    color: 'white',
  },
});

export default ChangePassword;
