/* @flow */

import React, { Component } from 'react'

import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

import { connect } from 'react-redux'

import type { Action } from './actions'
import type { AppState } from './reducers'

type Props = {
    dispatch : (action : Action) => void,
}

type InnerProps = Props & {
    pushToken : ?string,
}

class ReactNativeNotificationsExample extends Component {
    props : InnerProps

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Welcome to React Native Notifications!
                </Text>
                <Text style={styles.text}>
                    Push Token: {this.props.pushToken}
                </Text>
                <Text style={styles.text}>
                    Don't forget to add your own 'google-services.json' to your Android project. The one included in this example won't work for you.
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    text: {
        textAlign: 'center',
        color: '#333333',
        margin: 5,
    },
})


function mapStateToProps(state : AppState, ownProps : Props) : InnerProps {
    return {
        ...ownProps,
        pushToken: state.device.pushToken,
    }
}

module.exports = connect(mapStateToProps)(ReactNativeNotificationsExample)
