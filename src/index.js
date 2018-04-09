import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'
import TimerView from './container/timer'
import TodoView from './container/todo'

configure({ enforceActions: true })

function App() {
    return <div>
        <TimerView />
        <TodoView />
    </div>
}

ReactDOM.render(<App />, document.getElementById('app'))