import React, {Component} from 'react';

import {StyleSheet, Text, View, TextInput} from 'react-native';

const input = (props) => {
  let template = null;

switch (props.type){
    case 'textinput':
        template =
        <TextInput
        {...props}
        style={[styles.input,props.overrideStyle]}
            />;
    break;
    default:
        return template;
}
 return template;
};
const styles = StyleSheet.create({

    input: {
        width:'80%',
        borderBottomWidth:1,
        borderBottomColor:'#F6E8B1',
        fontSize:16,
        padding:5,
        marginTop:10,
        alignSelf:'auto'

    }
});
export default input;
