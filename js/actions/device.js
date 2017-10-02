/* @flow */

export const PUSH_TOKEN_UPDATED = 'PUSH_TOKEN_UPDATED'

export type PushTokenUpdated = {|
    type: 'PUSH_TOKEN_UPDATED',
    pushToken: string,
|}

export function pushTokenUpdated(pushToken : string) : PushTokenUpdated {
    return {type: PUSH_TOKEN_UPDATED, pushToken}
}

export type DeviceAction = PushTokenUpdated
