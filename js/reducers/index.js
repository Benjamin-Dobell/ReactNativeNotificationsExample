/* @flow */

import { combineReducers } from 'redux'

import device from './device'

import type { DeviceState } from './device'

export type AppState = {
    device : DeviceState,
}

const appReducer : (state : AppState, action : Action) => AppState = combineReducers({
    device,
})

export default appReducer
