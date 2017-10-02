/* @flow */

import * as DeviceActions from '../actions/device'

import type { Action } from '../actions'

export type DeviceState = {
    pushToken : string,
}

const initialState : DeviceState = {
    pushToken: null,
}

const device = (state : DeviceState = initialState, action : Action) : DeviceState => {
    switch (action.type) {
        case DeviceActions.PUSH_TOKEN_UPDATED:
            return {
                ...state,
                pushToken: action.pushToken,
            }
    }

    return state
}

export default device
