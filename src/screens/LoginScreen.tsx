import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { createRequestToken, createSession } from '../redux/authSlice';
import { AppDispatch } from '../redux/store';

function LoginScreen(): JSX.Element {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch<AppDispatch>()

  const request_token = useSelector((state: MyState) => state.auth)

  const doCreateToken = () => {
    dispatch(createRequestToken())
  }

  useEffect(() => {
    if(request_token.status === 'succeeded'){
      dispatch(createSession({username, password, request_token}))
    }
  },[request_token])


  return(
    <View style={{ paddingHorizontal: 10, flex: 1, justifyContent: 'center' }}>
        <TextInput
          onChangeText={(text) => setUsername(text)}
          style={{ borderWidth: 1, borderColor: 'black', borderRadius: 50, marginBottom: 10, paddingHorizontal: 10 }}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          style={{ borderWidth: 1, borderColor: 'black', borderRadius: 50, paddingHorizontal: 10 }}
        />
        <TouchableOpacity onPress={() => doCreateToken()} style={{ backgroundColor: 'blue', height: 50, borderRadius: 50, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Login</Text>
        </TouchableOpacity>
    </View>
  )
}

export default LoginScreen;