import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { connect } from '../utils'
import { observable, action, autorun, computed, when } from 'mobx'

class ADD {

    constructor() {
        when(() => this.a === 3, () => {
            console.log('a hah....')
        })
    }

    @observable
    a = 0

    @observable
    b = 0

    @computed
    get totol() {
        return this.a + this.b
    }
}

