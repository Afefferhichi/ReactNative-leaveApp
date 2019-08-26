import React, { Component } from "react";
import { View, Text, Image, TextInput,ActivityIndicator, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../common/Header";
import ProfileCard from "../common/ProfileCard";
import { ScrollView, gestureHandlerRootHOC } from "react-native-gesture-handler";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
/*
function AbsenceTeamList(){
  const { loading, error, data } = useQuery(gql`
  {
   employees{
     firstName
     lastName
   }
  }
`);
console.log(loading);
  return(
    <Text>This is a test</Text>
  )
}
*/

function AbsenceTeamItem({item}){
  return (
    <ProfileCard
          onPress={() => this.props.navigation.navigate("AbsenceHistory")}
    name={`${item.firstName} ${item.lastName}`}
    status="Employee"
    source={require("../../assets/icons/Capture.png")}
    
  />
  )
}

function AbsenceTeamList() {
  const { loading, error, data } = useQuery(gql`
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
    console.log(error)
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error </Text>;


  return (
      <View>
        <View
          style={{
            height: 58,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#f3f3f3",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <Icon
            name="md-menu"
            size={30}
            style={{ paddingLeft: 10, paddingRight: 20 }}
            onPress={() => this.props.navigation.openDrawer()}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000000"  }}>
                           Team List
          </Text>
        </View>
        <TextInput
          style={{
            backgroundColor: "white",
            width: "90%",
            alignSelf: "center",
            borderColor: "#f3f3f3",
            borderWidth: 1,
            marginTop: 5,
            marginBottom: 5,
            borderRadius: 20,
            height: 40,
            justifyContent: "center"
          }}
          placeholder="Search here"
        />
        <FlatList
            data={data.employees}
            extraData={data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
      </View>
  )
}


 /*class AbsenceTeamList extends Component {
   render() {
     console.log('This is props ===>>>',this.props)
     return (
       <View>
         <View
           style={{
             height: 58,
             backgroundColor: "white",
             borderWidth: 1,
             borderColor: "#f3f3f3",
             alignItems: "center",
             flexDirection: "row"
           }}
         >
           <Icon
             name="md-menu"
             size={30}
             style={{ paddingLeft: 10, paddingRight: 20 }}
             onPress={() => this.props.navigation.openDrawer()}
           />
           <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000000"  }}>
                            Team List
           </Text>
         </View>
         <TextInput
           style={{
             backgroundColor: "white",
             width: "90%",
             alignSelf: "center",
             borderColor: "#f3f3f3",
             borderWidth: 1,
             marginTop: 5,
             marginBottom: 5,
             borderRadius: 20,
             height: 40,
             justifyContent: "center"
           }}
           placeholder="Search here"
         />
         <ScrollView>
           <ProfileCard
           onPress={() => this.props.navigation.navigate("AbsenceHistory")}
             name="Nour Al Jinen"
             status="Trainee"
             source={{
               uri:
                 "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
             }}
           />
           <ProfileCard
           onPress={() => this.props.navigation.navigate("AbsenceHistory")}
             name="Awais Ahmed"
             status="Leave for nothingss"
             source={{
               uri:
                 "https://s7img.ftdi.com/is/image/ProvideCommerce/PF_19_R299_LAY_SHP_V2?$proflowers-tile-wide-mv-new$"
             }}
           />
          <ProfileCard
             name="Nour Al Jenin"
             status="Leave for brother weddigns"
             source={{
               uri:
                 "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
             }}
           />
           <ProfileCard
             name="Iheb ayadi"
             status="Employee"
             onPress={() => this.props.navigation.navigate("AbsenceHistory")}
             source={{
               uri:
                 "http://www.himalayanbuzz.com/wp-content/uploads/2016/10/Shubh-Chandra-Cover.jpg"
             }}
           />
           <ProfileCard
             name="Muhammad Ali "
             status="Leave for unKnown reason"
             source={{
               uri:
                "http://www.himalayanbuzz.com/wp-content/uploads/2016/10/Shubh-Chandra-Cover.jpg"
             }}
           />
           <ProfileCard
             name="Awais Ahmed"
             status="Leave for nothingss"
             source={{
               uri:
                 "http://www.himalayanbuzz.com/wp-content/uploads/2016/10/Shubh-Chandra-Cover.jpg"
             }}
           />
         </ScrollView>
       </View>
     );
   }
 }*/
//export default AbsenceTeamList;
export default AbsenceTeamList