import React, { Component } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { ActionSheet } from 'teaset';

const SELECTED_COLOR = 'lightgreen';
class CustomCalendar extends Component {

    constructor(props) {
        super();
        const startDate = props.startDate || '2019-08-12' || null;
        const endDate = props.endDate || '2019-08-15' || null;

        this.state = {
            startDate: startDate, endDate: endDate,
            startDateNoon: null, endDateNoon: null,
            markedDates: (startDate && endDate) ? this.getMarkedDates(startDate, endDate, null, null) : {},
            showCalendar: false
        };

    }

    // =-========== Related Range Calendar

    selectDate = async (day) => {

        if (this.state.startDate && this.state.endDate) {
            this.selectDateWithNoon(day, 'NONE');
        }
        else {
            ActionSheet.hide();
            ActionSheet.show([
                { title: 'All day', onPress: () => this.selectDateWithNoon(day, 'ALL_DAY') },
                { title: 'Before noon', onPress: () => this.selectDateWithNoon(day, 'BEFORE_NOON') },
                { title: 'After noon', onPress: () => this.selectDateWithNoon(day, 'AFTER_NOON') },
            ], {
                    title: 'Cancel'
                });
        }
    };

    selectDateWithNoon = async (day, noon) => {
        const date = day.dateString;
        let markedDates = {};

        if (this.state.startDate === null) {
            let _noon = (noon === 'BEFORE_NOON' ? 'ALL_DAY' : noon);
            await this.setState({
                startDate: date,
                startDateNoon: _noon
            });
            markedDates[`${date}`] =
                {
                    startingDay: true, endingDay: true,
                    selected: true, color: SELECTED_COLOR, textColor: 'black',
                    customStyles: this.getCustomStyles(true, false, true)
                };
        } else if (this.state.endDate === null) {
            let _noon = (noon === 'AFTER_NOON' ? 'ALL_DAY' : noon);
            if (new Date(date) < new Date(this.state.startDate)) {
                await this.setState({
                    startDate: date, endDate: this.state.startDate,
                    endDateNoon: _noon
                });
            } else {
                await this.setState({ endDate: date,
                    endDateNoon: _noon });
            }
            markedDates = this.getMarkedDates(this.state.startDate, this.state.endDate, this.state.startDateNoon, this.state.endDateNoon);
        } else {
            await this.setState({ startDate: null, endDate: null });
        }

        await this.setState({ markedDates: markedDates })
    };

    getMarkedDates = (startDate, endDate, startDateNoon, endDateNoon) => {
        const date1 = Math.min(new Date(startDate), new Date(endDate))
        const date2 = Math.max(new Date(startDate), new Date(endDate))
        let _date = 0; let index = 0;
        let markedDates = {};
        let isStart = false, isEnd = false;

        while (true) {
            _date = new Date(date1 + 1000 * 3600 * 24 * index)
            isStart = index === 0;
            isEnd = _date >= date2;
            markedDates[`${_date.toISOString().substr(0, 10)}`] =
                {
                    selected: true,
                    color: SELECTED_COLOR, textColor: 'black',
                    startingDay: isStart, endingDay: isEnd,
                    customStyles: this.getCustomStyles(isStart, isEnd)
                };
            index++;
            if (_date >= date2) break;
        }
        return markedDates;
    };

    getCustomStyles = (isStart, isEnd, alone = false) => {
        return {
            container: {
                backgroundColor: alone ? '' : SELECTED_COLOR,
                height: 33,
                width: isStart ? 40 : 47,
                marginLeft: isStart ? 7 : 0,
                alignItems:
                    isStart ?
                        'flex-start'
                        :
                        isEnd ?
                            'flex-end'
                            :
                            'center',
                borderRadius: 0,
                // borderTopRightRadius: isEnd ? 10 : 0,
                // borderBottomRightRadius: isEnd ? 10 : 0,
            },
            text:
                isStart ?
                    {
                        position: 'absolute', top: -4,
                        lineHeight: 32,
                        textAlign: 'center',
                        width: 0, height: 0,
                        borderBottomWidth: 33,
                        borderBottomColor: SELECTED_COLOR,
                        borderLeftWidth: 32,
                        borderLeftColor: 'white'
                    } :
                    isEnd ?
                        {
                            position: 'absolute', top: -4,
                            lineHeight: 32,
                            textAlign: 'center',
                            width: 0, height: 0,
                            borderTopWidth: 33,
                            borderTopColor: SELECTED_COLOR,
                            borderRightWidth: 32,
                            borderRightColor: 'white',
                        }
                        :
                        {
                            position: 'absolute', top: -4,
                            lineHeight: 32,
                            height: 34,
                            textAlign: 'center',
                        }
        }
    };
    // =-========== Related Range Calendar : end

    render() {
        return (
            <View style={{
                position: 'absolute', zIndex: 1000,
                backgroundColor: 'white',
                flex: 1, height: '100%',
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
                    markingType={'custom'}
                    theme={{
                        'stylesheet.day.custom': {
                            base: {
                                overflow: 'hidden',
                                height: 34,
                                alignItems: 'center',
                                width: 38,
                            }
                        }
                    }} />

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
