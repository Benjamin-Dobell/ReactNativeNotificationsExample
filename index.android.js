/* @flow */

import { AppRegistry } from 'react-native'
import {
    createRootComponent,
    initializeGlobalListeners
} from './js/root'

AppRegistry.registerComponent('ReactNativeNotificationsExample', createRootComponent)

initializeGlobalListeners()
