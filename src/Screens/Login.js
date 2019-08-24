import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, ImageBackground} from 'react-native';
import Input from '../common/Input';
import validationRules from '../common/validationRules';


//import console = require('console');

class Login extends Component {
    state= {
        type:'Login',
        action:'Login',
        hasErrors:false,
       form:{
           email:{
               value:"",
               valid:false,
               type:"textinput",
               rules:{
                    isRequired:true,
                    isEmail:true
               }
            },
            password:{
                value:"",
                valid:false,
                type:"textinput",
                rules:{
                    isRequired:true,
                    minLength:6
               }

    }}}
   formHasErrors = () => (
        this.state.hasErrors ?
        <View style={styles.errorContainer}>
            <Text style={styles.errorLabel}>Oops, check your info.</Text>

        </View>
        :null
   )

  updateInput = (name, value) => {
       this.setState({
           hasErrors:false
       });
       let formCopy = this.state.form;
       formCopy[name].value = value;

       //rules
       let rules = formCopy[name].rules;
       let valid = validationRules[value, rules, formCopy]

       console.log(valid)

       formCopy[name].valid = valid;

       this.setState({
           form:formCopy
       })
   }
   submitUser = () => {

   }

    render(){
        const {navigate} = this.props.navigation;
        return(
          <ImageBackground  style={{height:"100%", width:'100%', justifyContent:'center', alignItems:"center"}} source={require("../../assets/icons/img.png")}>
           <Input 
                placeholder="Entrer email"
                placeholderTextColor="#F6E8B1"
                type={this.state.form.email.type}
                value={this.state.form.email.value}
                autoCapitalize={"none"}
                keyboardType={"email-address"}
                onChangeText={ value => this.updateInput("email",value)}
           />
          <Input 
                placeholder="Entrer your password"
                placeholderTextColor="#F6E8B1"
                type={this.state.form.password.type}
                value={this.state.form.password.value}
                onChangeText={ value => this.updateInput("password",value)}
                secureTextEntry
           />
            
            {this.formHasErrors()}
            
            <View style={{marginTop:20}}>

                 <View style={styles.button}>
                         <Button
                                 title="Login"
                                 color="#183152"


                                 onPress={() =>
                                    this.props.navigation.navigate("Absence")}
/>
              
          </View>
            </View>

          </ImageBackground>  
        )
    }
    }



    const styles = StyleSheet.create({
    errorContainer:{
        marginBottom:10,
        marginTop:30,
        padding:10,
        backgroundColor:'white'
    },
    errorLabel:{
        color:'#fff',
        textAlignVertical:'center',
        textAlign:'center'

    },
    button:{
        marginBottom:0
    }


     })

    export default Login;