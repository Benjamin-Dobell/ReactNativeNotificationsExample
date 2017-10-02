/* @flow */

import React, { Component } from 'react'

import { Platform } from 'react-native'

import { Provider } from 'react-redux'

import {
    default as NotificationsIOS,
    NotificationsAndroid,
} from 'react-native-notifications'

import ReactNativeNotificationsExample from './ReactNativeNotificationsExample'
import StoreLoader from './StoreLoader'

import { pushTokenUpdated } from './actions/device'

type RootState = {
    store : any
}

const storeLoader = new StoreLoader()

export function createRootComponent() {
    class Root extends Component {
        state : RootState

        constructor() {
            super()

            this.state = {
                store: null,
            }
        }

        componentDidMount() {
            storeLoader.addListener(this._onStoreLoaded)
        }

        render() {
            return this.state.store ? (
                <Provider store={this.state.store}>
                    <ReactNativeNotificationsExample/>
                </Provider>
            ) : null
        }

        _onStoreLoaded = (store) => {
            this.setState({store})
        }
    }

    return Root
}

// When your app is launched straight into background mode on iOS or Android the Component hierarchy is *not* initialized. Consequently, setting up push
// notification listeners in a Component is a bad practice, as you won't be able to consistenly handle notifications whilst backgrounded. We set them up as
// global listeners, independent of our Component hierarchy.

export function initializeGlobalListeners() {
    // We're using a persistent redux store, we want to wait for the store to be loaded before we handle any push notifications.
    storeLoader.addListener((store) => {
        function onPushRegistered(pushToken) {
            console.log('Push token updated', pushToken)
            store.dispatch(pushTokenUpdated(pushToken))
        }

        function onPushRegistrationFailed(error) {
            console.error(error)
        }

        function onNotificationReceived(notification) {
            console.log('Notification received')

            // On Android we send data-only notifications and generate a local notification in response
            if (Platform.OS === 'android') {
                if (notification.isDataOnly()) {
                    NotificationsAndroid.localNotification(JSON.parse(notification.getData().innerNotification))
                } else {
                    NotificationsAndroid.localNotification(notification)
                }
            }
        }

        function onNotificationOpened(notification) {
            console.log('Notification opened')
        }

        function monitorPushNotifications() {
            if (Platform.OS === 'ios') {
                NotificationsIOS.addEventListener('remoteNotificationsRegistered', onPushRegistered)
                NotificationsIOS.addEventListener('remoteNotificationsRegistrationFailed', onPushRegistrationFailed)

                NotificationsIOS.addEventListener('notificationReceivedForeground', onNotificationReceived)
                NotificationsIOS.addEventListener('notificationReceivedBackground', onNotificationReceived)

                NotificationsIOS.addEventListener('notificationOpened', onNotificationOpened)

                // TODO: Move this after your login flow, prompting on app launch is BAD!
                NotificationsIOS.requestPermissions()

                NotificationsIOS.consumeBackgroundQueue()
            } else if (Platform.OS === 'android') {
                NotificationsAndroid.setRegistrationTokenUpdateListener(onPushRegistered)
                NotificationsAndroid.setNotificationReceivedListener(onNotificationReceived)
                NotificationsAndroid.setNotificationOpenedListener(onNotificationOpened)

                NotificationsAndroid.consumeBackgroundQueue()
            }
        }

        monitorPushNotifications()
    })
}
