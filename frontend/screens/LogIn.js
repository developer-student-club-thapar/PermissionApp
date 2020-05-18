//Login page

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
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import Button from '../components/Button';
import LoginOptions from '../components/LoginOptions';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../components/context/auth-context';
import Input from '../components/ui/Input';
import { VALIDATOR_REQUIRE } from '../components/Validator';

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
const LogIn = (props) => {
  const [isTouched, setTouched] = useState(false);
  const [isAuthenicated, setAuthetication] = useState(true);
  const [isloading, setIsLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const auth = useContext(AuthContext);

  const [selectedOption, toggleBorderHandler] = useState([
    {
      type: 'Student',
      border: 'rgba(255,255,255,1)',
      selected: true,
      navigateTo: 'Home',
    },
    {
      type: 'Warden',
      border: 'rgba(255,255,255,0)',
      selected: false,
      navigateTo: 'Warden',
    },
    {
      type: 'Caretaker',
      border: 'rgba(255,255,255,0)',
      selected: false,
      navigateTo: 'Caretaker',
    },
  ]);

  const [formData, setFormData] = useState({});
  const [clicked, setClick] = useState(false);

  const loginOptionsHandler = (index) => {
    //to create a copy of the original array, so as not to change the original state.
    let newArr = [...selectedOption];
    //iterate over the array to find the one which was pressed and received in 'index' arguement.
    let identifiedPlace = newArr.find((p) => p.type === index);

    for (let option of newArr) {
      option.border = 'rgba(255,255,255,0)';
      option.selected = false;
    }
    identifiedPlace.border = 'rgba(255,255,255,1)';
    identifiedPlace.selected = true;
    toggleBorderHandler(newArr);

    //navigate to the pressed option using navigaton prop received from navigation.js
    //props.navigation.navigate(identifiedPlace.type);
  };
  const navigateHandler = () => {
    for (let select of selectedOption) {
      if (select.selected) {
        props.navigation.navigate(select.navigateTo);
      }
    }
  };
  const onClickHandler = (index) => {
    setClick(true);
    setTouched(true);
  };

  //to set the form Data object whenever value of clicked changes
  useEffect(() => {
    function func() {
      setFormData({
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      });
    }
    if (clicked) {
      func();
    }
  }, [clicked]);

  useEffect(() => {
    if (auth.token) {
      for (let select of selectedOption) {
        if (select.selected && select.type == auth.category) {
          props.navigation.navigate(select.navigateTo);
        } else if (select.selected && select.type != auth.category) {
          setAuthetication(false);
        }
      }
    } else {
      setAuthetication(true);
    }
  }, [auth.token, auth.category]);

  //to reset navigate to status page whenever form data changes and clicked is true.
  useEffect(() => {
    async function fetchData() {
      if (clicked) {
        //console.log(formData);
        try {
          setIsLoading(true);
          setSpinner(true);
          const response = await fetch(
            'http://192.168.43.33:5000/api/users/login',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                Email_id: formState.inputs.email.value,
                Password: formState.inputs.password.value,
              }),
            },
          );
          const responseData = await response.json();
          //console.log(responseData);

          if (responseData.token) {
            setAuthetication(true);
            //console.log(responseData.category);
            await auth.login(
              responseData.userId,
              responseData.token,
              responseData.name,
              responseData.category,
            );
          } else {
            setAuthetication(false);
          }
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
      email: {
        value: '',
        isValid: false,
      },
      password: {
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
      <Image
        source={require('../assets/images/logo.png')}
        resizeMode="contain"
        style={styles.logoImage}
      ></Image>

      <View style={styles.innerContainer}>
        <View style={styles.selectOption}>
          {selectedOption.map((option) => {
            return (
              <LoginOptions
                type={option.type}
                key={option.type}
                onClick={loginOptionsHandler}
                border={option.border}
              />
            );
          })}
        </View>
        {!isAuthenicated && isTouched && !isloading && (
          <Text
            style={{
              fontWeight: 'bold',
              color: 'red',
              textAlign: 'center',
              padding: 3,
              fontSize: 18,
              backgroundColor: 'rgba(15,15, 15,0.7)',
            }}
          >
            Please check your credentials!
          </Text>
        )}

        <Input
          iconName="user"
          placeholder="Username"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Required!"
          onInput={inputHandler}
          afterSubmit={formData}
          id="email"
        />
        <Input
          iconName="lock"
          placeholder="Password"
          secureTextEntry={true}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Required!"
          onInput={inputHandler}
          afterSubmit={formData}
          id="password"
        />

        <Button
          buttonText="Log In"
          onClick={onClickHandler}
          color="rgba(95,0,14,1)"
          textColor="white"
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
  logoImage: {
    width: 200,
    height: 200,
    alignItems: 'center',
    marginTop: '10%',
  },

  selectOption: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,1)',
    shadowRadius: 0,
    marginBottom: 30,
  },
  selectedbuttonLogin: {
    opacity: 1,
    borderRadius: 5,
    borderColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
  },
  selectbuttonLogin: {
    opacity: 1,
  },
  selectTextLogin: {
    color: 'rgba(255,255,255,1)',
    alignSelf: 'center',
    padding: 4,
  },

  rect9: {
    height: 59,
    backgroundColor: 'rgba(251,247,247,0.25)',
    opacity: 1,
    marginBottom: 20,
    borderRadius: 5,
    flexDirection: 'row',
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

export default LogIn;
