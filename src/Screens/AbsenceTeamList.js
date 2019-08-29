import React from 'react';
import {ActivityIndicator, FlatList, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileCard from '../common/ProfileCard';

import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';


function AbsenceTeamItem({item}) {
  return (
    <ProfileCard
      onPress={() => this.props.navigation.navigate('AbsenceHistory')}
      name={`${item.firstName} ${item.lastName}`}
      status='Employee'
      source={require('../../assets/icons/Capture.png')}

    />
  );
}

function AbsenceTeamList() {
  const {loading, error, data} = useQuery(gql`
  {
   employees{
   firstName
   lastName
   }
  }
  `);

  _keyExtractor = (item, index) => item.firstName;

  _renderItem = ({item}) => (
    <AbsenceTeamItem
      item={item}
    />
  );
  console.log(error);
  if (loading) {
    return <ActivityIndicator/>;
  }
  if (error) {
    return <Text>Error </Text>;
  }


  return (
    <View>
      <View
        style={{
          height: 58,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: '#f3f3f3',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <Icon
          name='md-menu'
          size={30}
          style={{paddingLeft: 10, paddingRight: 20}}
          onPress={() => this.props.navigation.openDrawer()}
        />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
          Team List
        </Text>
      </View>
      <TextInput
        style={{
          backgroundColor: 'white',
          width: '90%',
          alignSelf: 'center',
          borderColor: '#f3f3f3',
          borderWidth: 1,
          marginTop: 5,
          marginBottom: 5,
          borderRadius: 20,
          height: 40,
          justifyContent: 'center'
        }}
        placeholder='Search here'
      />
      <FlatList
        data={data.employees}
        extraData={data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    </View>
  );
}

export default AbsenceTeamList;
