import React, { useEffect } from 'react';
import { Text, View, Image, Dimensions, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { palette } from '../assets/palette';
import Seperator from '../components/Seperator';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from '../redux/accountSlice';
import { User } from '../types/types';
import { AppDispatch } from '../redux/store';

const windowHeight = Dimensions.get('window').height;

interface MyState {
  account: {user: User}
}

function ProfileScreen(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()

  const user = useSelector((state: MyState) => state.account.user)

  useEffect(() => {
    dispatch(userDetails('20394161'))
  },[])

    return (
      <ScrollView style = {{ marginBottom: 10 }}>
        <View>
          <ImageBackground style={{ width: '100%', height: windowHeight / 3, justifyContent: 'center', alignItems: 'center' }} source={require('../assets/profile.jpg')} >
            <View style={{ width: 90, height: 90, borderRadius: 50, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons name="account-outline" color={'#BDBDBD'} size={60} />
            </View>
            <Text style = {{ color: '#fff', fontSize: 15, marginTop: 10 }}>{user.username}</Text>
            <Text style = {{ color: '#fff', fontSize: 15 }}>Joined in March 2023</Text>
          </ImageBackground>
          
          <View style = {{ paddingHorizontal: 10, paddingTop: 10 }}>
            <Text style = {{  fontWeight: 'bold', fontSize: 20, color: palette.colors.titles }}>Profile Details</Text>

            <Text style = {{ color: palette.colors.titles, marginTop: 10, fontSize: 15 }}>Email</Text>
            <Text style = {{ color: palette.colors.texts, fontSize: 15 }}>thaer@innov8tif.com</Text>

            <Seperator />

            <Text style = {{ color: palette.colors.titles, fontSize: 15 }}>Mobile Number</Text>
            <Text style = {{ color: palette.colors.texts, fontSize: 15 }}>+60 1160640434</Text>

            <Seperator />

            <View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style = {{ color: palette.colors.titles, fontSize: 15 }}>Password</Text>
                <Text style = {{ color: palette.colors.texts, fontSize: 15 }}>**************</Text>
              </View>
              <TouchableOpacity>
                <MaterialCommunityIcons name="pencil-circle" color={'black'} size={30} />
              </TouchableOpacity>
            </View>

            <Seperator />
            
            <Text style = {{  fontWeight: 'bold', fontSize: 20, color: palette.colors.titles, marginBottom: 10 }}>Document Provider</Text>
            <View style = {{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style = {{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="arrow-up-circle" color={'#9E9E9E'} size={30} />

                <View style = {{ marginLeft: 15 }}>
                  <Text style = {{ color: palette.colors.texts }}>To Upload</Text>
                  <Text style = {{ color: palette.colors.texts }}>Selfie with IC</Text>
                </View>
              </View>
              <View style = {{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="arrow-up-circle" color={'#9E9E9E'} size={30} />

                <View style = {{ marginLeft: 15 }}>
                  <Text style = {{ color: palette.colors.texts }}>To Upload</Text>
                  <Text style = {{ color: palette.colors.texts }}>IC/Passport</Text>
                </View>
              </View>
            </View>

            <View style = {{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <View style = {{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="arrow-up-circle" color={'#9E9E9E'} size={30} />

                <View style = {{ marginLeft: 15 }}>
                  <Text style = {{ color: palette.colors.texts }}>To Upload</Text>
                  <Text style = {{ color: palette.colors.texts }}>Driving License</Text>
                </View>
              </View>
              <View style = {{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="arrow-up-circle" color={'#9E9E9E'} size={30} />

                <View style = {{ marginLeft: 15 }}>
                  <Text style = {{ color: palette.colors.texts }}>To Upload</Text>
                  <Text style = {{ color: palette.colors.texts }}></Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style = {{ borderWidth: 1, borderColor: 'red', width: '90%',height: 35 , justifyContent: 'center', alignItems: 'center', marginTop: 15, alignSelf: 'center', borderRadius: 10 }}>
              <Text style = {{ color: 'red', fontWeight: 'bold' }}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
}

export default ProfileScreen;