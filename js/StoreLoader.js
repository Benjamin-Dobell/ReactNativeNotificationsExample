/* @flow */

import { AsyncStorage } from 'react-native'

import { createStore } from 'redux'

import {
    autoRehydrate,
    persistStore,
} from 'redux-persist'

import appReducer from "./reducers"

export default class StoreLoader {
    _loaded : boolean
    _store : Object
    _callbacks : ((Object) => void)[]

    constructor() {
        persistStore(this._store, {storage: AsyncStorage}, this._onLoaded)
    }

    addListener(callback : (Object) => void) {
        if (this._loaded) {
            callback(this._store)
        } else {
            this._callbacks.push(callback)
        }
    }

    _loaded = false
    _store = autoRehydrate()(createStore)(appReducer)
    _callbacks = []

    _onLoaded = () => {
        this._loaded = true

        for (let callback of this._callbacks) {
            callback(this._store)
        }

        this._callbacks = []
    }
}
