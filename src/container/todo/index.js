import React, { Component, PureComponent } from 'react'
import { observer } from 'mobx-react'
import { connect } from '../utils'
import { observable, action, autorun, computed } from 'mobx'

class TodoState {
	@observable todoLen = 1

	@observable
	todos = [
		{
			title: 'vue 学习',
			done: true,
		},
		{
			title: 'mobx 学习',
			done: false,
		},
	]

	@observable showFlag = 'all'

	@computed
	get completedCount() {
		return this.showArr.length
	}

	@computed
	get showArr() {
		switch (this.showFlag) {
			case 'all': {
				return this.todos
			}
			case 'complete': {
				return this.todos.filter(todo => todo.done === true)
			}
			case 'rough': {
				return this.todos.filter(todo => todo.done === false)
			}
			default:
				return this.todos
		}
	}

	@action
	addTodoLen() {
		this.todoLen++
	}

	@action
	onDel = title => {
		this.todos = this.todos.filter(todo => todo.title !== title)
	}

	@action
	onChangeState(title, value) {
		this.todos.find(todo => todo.title === title).done = value
	}

	@action
	onAdd(value) {
		this.todos.push({
			title: value,
			done: false,
		})
	}

	@action
	onChangeFlag = value => {
		this.showFlag = value
	}
}

const todoState = new TodoState()

class TodoItem extends PureComponent {
	render() {
		const { title, done, onDel, onChangeState } = this.props
		return (
			<div>
				<div>
					<span>
						<input
							type="checkbox"
							checked={done}
							onChange={e => {
								onChangeState(title, e.target.checked)
							}}
						/>
					</span>
					<span style={{ marginRight: 10 }}>{title}</span>
					<span>{done ? '完成' : '进行中'}</span>
					<span>
						<button
							onClick={() => {
								onDel(title)
							}}
						>
							删除
						</button>
					</span>
				</div>
			</div>
		)
	}
}

@connect({ todoState })
@observer
class TodoView extends Component {
	onDel = title => {
		this.props.todoState.onDel(title)
	}

	onChangeState = (title, value) => {
		this.props.todoState.onChangeState(title, value)
	}

	onAdd = () => {
		const value = this.inputRef.value
		if (value) {
			this.props.todoState.onAdd(value)
			this.inputRef.value = ''
		}
	}

	onChangeFlag = value => {
		this.props.todoState.onChangeFlag(value)
	}

	render() {
		const { todos, showArr, completedCount } = this.props.todoState
		return (
			<div>
				<p>todo 列表</p>
				<div>
					<input ref={ref => (this.inputRef = ref)} type="text" />
					<button onClick={this.onAdd}>添加</button>
				</div>
				<div>
					{[
						{ key: 'all', name: '全部' },
						{ key: 'complete', name: '完成' },
						{ key: 'rough', name: '未完成' },
					].map(config => {
						return (
							<button
								key={config.key}
								onClick={() => {
									this.onChangeFlag(config.key)
								}}
							>
								{config.name}
							</button>
						)
					})}
				</div>
				{showArr.map(todo => {
					return (
						<TodoItem
							key={todo.title}
							{...todo}
							onChangeState={this.onChangeState}
							onDel={this.onDel}
						/>
					)
				})}
				{completedCount}
			</div>
		)
	}
}

export default TodoView
