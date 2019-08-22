import React, { Component } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';

class CustomCalendar extends Component {

    constructor(props) {
        super();
        const startDate = props.startDate || null;
        const endDate = props.endDate || null;

        this.state = {
            startDate: startDate, endDate: endDate,
            markedDates: (startDate && endDate) ? this.getMarkedDates(startDate, endDate) : {},
            showCalendar: false
        };

    }

    // =-========== Related Range Calendar

    selectDate = async (day) => {
        const date = day.dateString;
        let markedDates = {};

        if (this.state.startDate === null) {
            await this.setState({ startDate: date });
            markedDates[`${date}`] =
                { startingDay: true, endingDay: true,
                    selected: true, color: 'green', textColor: 'white' };
        } else if (this.state.endDate === null) {
            if (new Date(date) < new Date(this.state.startDate)) {
                await this.setState({ 
                    startDate: date, endDate: this.state.startDate
                });
            } else {
                await this.setState({ endDate: date });
            }
            markedDates = this.getMarkedDates(this.state.startDate, this.state.endDate);
        } else {
            await this.setState({ startDate: null, endDate: null });
        }

        await this.setState({ markedDates: markedDates })

    };

    getMarkedDates = (startDate, endDate) => {
        const date1 = Math.min(new Date(startDate), new Date(endDate))
        const date2 = Math.max(new Date(startDate), new Date(endDate))
        let _date = 0; let index = 0;
        let markedDates = {};
        while (true) {
            _date = new Date(date1 + 1000 * 3600 * 24 * index)
            markedDates[`${_date.toISOString().substr(0, 10)}`] =
                { selected: true, startingDay: index === 0, endingDay: _date >= date2, color: 'green', textColor: 'white' };
            index++;
            if (_date >= date2) break;
        }
        return markedDates;
    };
    // =-========== Related Range Calendar : end

    render() {
        return (
            <View style={{
                position: 'absolute', zIndex: 1000,
                backgroundColor: 'white',
                flex: 1, height: '100%'
            }}>
                <CalendarList
                    onDayPress={(day) => this.selectDate(day)}
                    style={{ marginBottom: 40 }}
                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={50}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={50}
                    // Enable or disable scrolling of calendar list
                    scrollEnabled={true}
                    // Enable or disable vertical scroll indicator. Default = false
                    showScrollIndicator={true}
                    markedDates={
                        this.state.markedDates
                    }
                    markingType={'period'}
                    theme={{
                        'stylesheet.day.period': {
                            base: {
                                overflow: 'hidden',
                                height: 34,
                                alignItems: 'center',
                                width: 38
                            }
                        }
                    }}
                />
                <View style={{
                    position: 'absolute', bottom: 0,
                    height: 35,
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity
                        onPress={() => this.props.onConfirm && this.props.onConfirm(this.state.startDate, this.state.endDate)}
                        style={{
                            width: '50%',
                            height: 35, alignItems: 'center', backgroundColor: 'green',
                        }}>
                        <Text style={{ color: 'white', lineHeight: 33 }}>OK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.onCancel && this.props.onCancel()}
                        style={{
                            width: '50%',
                            height: 35, alignItems: 'center', borderColor: 'green', borderWidth: 1,
                        }}>
                        <Text style={{ lineHeight: 33 }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default CustomCalendar;
