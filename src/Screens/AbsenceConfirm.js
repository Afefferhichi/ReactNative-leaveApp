import React, {Component} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


class AbsenceConfirm extends Component {
  constructor(props) {
    super();
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('mode')
    };
  };

  onConfirm = () => {
    this.props.navigation.goBack();
  };
  onCancel = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={{
        margin: 10
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderWidth: 1, borderColor: '#dcdcdc',
          padding: 10
        }}>
          <Image
            source={{
              uri:
                'https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
            }}
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#f2f2f2',
              borderRadius: 50
            }}
          />

          <View style={{
            flexDirection: 'column'
          }}>
            <Text style={{
              marginLeft: 5,
              fontWeight: '600'
            }}>Heart, Jennifer</Text>
            <View style={{
              flexDirection: 'row'
            }}>
              <Text style={{
                backgroundColor: 'gray', color: 'white',
                paddingVertical: 1, paddingHorizontal: 5, marginHorizontal: 5,
                borderRadius: 3
              }}
              >Pending</Text>
              <Text>-></Text>
              <Text style={{
                backgroundColor: '#3333aa', color: 'white',
                paddingVertical: 1, paddingHorizontal: 5, marginHorizontal: 5,
                borderRadius: 3
              }}>Approve</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Icon name='md-clock' size={14}/>
            <Text style={{fontSize: 11, marginLeft: 5}}>199 days ago</Text>
          </View>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderWidth: 1, borderColor: '#dcdcdc',
          borderTopWidth: 0,
          padding: 10
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Image
              source={{
                uri:
                  'https://s7img.ftdi.com/is/image/ProvideCommerce/PF_19_R299_LAY_SHP_V2?$proflowers-tile-wide-mv-new$'
              }}
              style={{
                width: 50,
                height: 50,
                backgroundColor: '#f2f2f2',
                borderRadius: 50
              }}
            />

            <View style={{
              width: '100%',
              paddingRight: 110,
            }}>
              <TextInput multiline={true} style={{
                width: '100%',
                height: 100,
                marginLeft: 10,
                borderWidth: 1,
                borderColor: '#dcdcdc',
                textAlignVertical: 'top'
              }}/>
            </View>

          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderWidth: 1, borderColor: '#dcdcdc',
          borderTopWidth: 0,
          padding: 3
        }}>
          <TouchableOpacity
            onPress={() => this.onConfirm()}
            style={{
              width: '50%', height: 33,
              backgroundColor: '#fff',
              alignItems: 'center', borderColor: '#aa0000', borderWidth: 1, borderRadius: 1
            }}>
            <Text style={{height: 33, color: '#aa0000', lineHeight: 28}}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onCancel()}
            style={{
              width: '50%', height: 33,
              backgroundColor: '#aa0000',
              alignItems: 'center', borderColor: '#aa0000', borderWidth: 1, borderRadius: 1
            }}>
            <Text style={{height: 33, color: '#eee', lineHeight: 28}}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default AbsenceConfirm;
