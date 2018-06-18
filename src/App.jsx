import React, { Component } from 'react'
import TaskList from './task-list/index'
import ModalAddNewTask from './modal-add-new-task/index'
import ExpiredTasksModal from './expired-tasks-modal/index'

import './App.css'

const initialTasksList = [
  {
    description: 'task1',
    date: '2018-06-19 11:00',
    expired: false,
    id: 1,
  },
  {
    description: 'task2',
    date: '2018-06-17 10:34',
    expired: false,
    id: 2,
  },
  {
    description: 'task3',
    date: '2018-06-20 10:33',
    expired: false,
    id: 3,
  },
  {
    description: 'task4',
    date: '2018-07-14',
    expired: false,
    id: 4,
  },
]

class App extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [],
    }
    this.newTasksLIst = []
    this.updateExpiredStatus = this.updateExpiredStatus.bind(this)
    this.updateExpiredStatus = this.updateExpiredStatus.bind(this)
    this.getExpiredTasks = this.getExpiredTasks.bind(this)
    this.removeTask = this.removeTask.bind(this)
    this.addNewTask = this.addNewTask.bind(this)
  }

  componentWillMount() {
    this.setState({ tasks: initialTasksList })
  }

  getExpiredTasks() {
    const expiredList = this.state.tasks.filter(task => task.expired)
    return expiredList
  }

  addNewTask(newTaskData) {
    const updatedTasksList = [...this.state.tasks, newTaskData]
    this.setState({ tasks: updatedTasksList })
  }

  updateExpiredStatus(id) {
    const taskForUpdate = this.state.tasks.find(task => task.id === id)
    taskForUpdate.expired = true
    const newTasksList = [...this.state.tasks.filter(task => task.id !== id), taskForUpdate]
    this.setState({ tasks: newTasksList })
  }

  removeTask(id) {
    this.newTasksLIst = this.state.tasks.filter(task => task.id !== id)
    this.setState({ tasks: this.newTasksLIst })
  }

  render() {
    const isTaskExist = !!(this.state.tasks && this.state.tasks.length)

    return (
      <div className="app">
        {isTaskExist &&
        <div>
          <TaskList
            tasksList={this.state.tasks}
            removeTask={this.removeTask}
            updateExpiredStatus={this.updateExpiredStatus}
          />
          <ExpiredTasksModal expiredTasks={this.getExpiredTasks()} removeTask={this.removeTask} />
        </div>
        }
        <ModalAddNewTask addNewTask={this.addNewTask} />
      </div>
    )
  }
}

export default App
