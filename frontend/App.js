import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import Navigation from './components/navigation/Navigation';
import { AuthContext } from './components/context/auth-context';
import { call } from 'react-native-reanimated';

export default function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [name, setName] = useState(false);
  const [category, setCategory] = useState(false);

  const login = useCallback((uid, token, name, category) => {
    setToken(token);
    setUserId(uid);
    setName(name);
    setCategory(category);
    //console.log(category);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setName(null);
    setCategory(null);
    //console.log("call");
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
        name: name,
        category: category,
      }}
    >
      <View style={styles.container}>
        <Navigation />
      </View>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
