import React, { Component } from 'react'
import { observable, action, computed, autorun, when, reaction } from 'mobx'
import { observer } from 'mobx-react'
import { connect } from '../utils'
import { addDays } from 'date-fns';

class AppState {

    constructor() {
        when(() => this.a === 3, () => {
            console.log('a hah....')
        })
    }

    @observable timer = 1

    @observable a = 1

    @observable b = 1

    @computed
    get getTotal() {
        return this.a + this.b
    }

    @action resetTimer() {
        this.timer = 0
    }

    @action
    addA() {
        this.a = this.a + 1
    }

    @action
    addB() {
        this.b = this.b + 1
    }

    @action
    addTimer() {
        this.timer ++
    }

    @action
    reduceTimer() {
        this.timer --
    }
}

const appState = new AppState()

const autorun1 = autorun(() => {
    console.log(appState.a)
})

const reaction1 = reaction(
    () => appState.a,
    (a, reaction) => {
        console.log(`reaction, a:${a}`)
        if (a === 11) {
            reaction.dispose()
        }
    }
)

// setInterval(action(function tick() {
//     appState.timer += 1;
// }), 1000);

// setTimeout(() => {
//     appState.a = 100
// }, 3000)

@connect({ appState })
@observer
class Timer extends Component {
	onReset() {
		this.props.appState.resetTimer()
	}

	render() {
		return (
            <div>
                <div>total: {this.props.appState.getTotal}</div>

                <button onClick={() => this.props.appState.addA()}>adda</button>
                <button onClick={() => this.props.appState.addB()}>addb</button>
                <button onClick={() => this.props.appState.addTimer()}>add</button>
                <button onClick={() => this.props.appState.reduceTimer()}>jian</button>
                <button onClick={this.onReset.bind(this)}>
                    Seconds passed: {this.props.appState.timer}
                </button>
                <div>
                    <button onClick={() => autorun1()}>取消autorun1</button>
                </div>
            </div>
		)
	}
}

export default Timer
