import React, { Component } from 'react';
import { DatePickerIOS, Text, TouchableOpacity, View } from 'react-native';
import { ActionSheet } from 'teaset';

class DatetimePickerIOS extends Component {
  constructor(props) {
    super();

    this.state = {
      chosenDate: new Date(),
      showPicker: false
    };

    this.setDate = this.setDate.bind(this);
  }

  confirm = () => {
    const { startDate, endDate, startDateIsHalf, endDateIsHalf } = this.state;
    this.props.onConfirm &&
      this.props.onConfirm(
        startDate,
        endDate || startDate,
        startDateIsHalf,
        endDateIsHalf || startDateIsHalf
      );
  };

  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }

  // =-========== Related Range Calendar : end

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 10000,
          backgroundColor: 'white',
          flex: 1,
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <DatePickerIOS
          mode={this.props.mode || 'date'}
          date={this.state.chosenDate}
          onDateChange={this.setDate}
          style={{width: '100%', height: 200}}
        />

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 35,
            width: '100%',
            flexDirection: 'row'
          }}
        >
          <TouchableOpacity
            onPress={() => this.confirm()}
            style={{
              width: '50%',
              height: 35,
              alignItems: 'center',
              backgroundColor: 'green'
            }}
          >
            <Text style={{ color: 'white', lineHeight: 33 }}>OK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.onCancel && this.props.onCancel()}
            style={{
              width: '50%',
              height: 35,
              alignItems: 'center',
              borderColor: 'green',
              borderWidth: 1
            }}
          >
            <Text style={{ lineHeight: 33 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default DatetimePickerIOS;
