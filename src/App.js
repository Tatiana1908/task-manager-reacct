import React, { Component } from 'react'
import TaskList from './task-list'
import ModalAddNewTask from './modal-add-new-task'
import ExpiredTasksModal from './expired-tasks-modal'

import './App.css'

let initialTasksList = [
  {
    'description': 'task1',
    'date': '2018-06-18',
    'expired': false,
    'id': 1
  },
  {
    'description': 'task2',
    'date': '2018-06-14',
    'expired': false,
    'id': 2
  },
  {
    'description': 'task3',
    'date': '2018-06-14',
    'expired': false,
    'id': 3
  },
  {
    'description': 'task4',
    'date': '2018-06-14',
    'expired': false,
    'id': 4
  }
]

class App extends Component {

  constructor(){
    super();
    this.state = {
        tasks: []
    };
    this.newTasksLIst = [];    
  }

  componentWillMount(){
    this.setState({tasks: initialTasksList })
  }

  removeTask = (id) => {
    this.newTasksLIst = this.state.tasks.filter( (task) => {
      return task.id !== id
    })
    this.setState({tasks: this.newTasksLIst})
  }

  addNewTask = newTaskData => {
    let updatedTasksList = [...this.state.tasks, newTaskData]
    this.setState({tasks: updatedTasksList})
  }

  updateExpiredStatus = id => {
    let taskForUpdate = this.state.tasks.find( task => task.id === id)
    taskForUpdate.expired = true
    let newTaskList = [...this.state.tasks.filter( task => task.id !== id), taskForUpdate]
    this.setState({tasks: newTaskList})
  }

  getExpiredTasks = () => {
    let expiredList = this.state.tasks.filter( task => task.expired )
    return expiredList
  }

  render() {
    console.log(this.getExpiredTasks())
    return (
      <div className="app">
        <TaskList tasksList={this.state.tasks} removeTaskHandler={this.removeTask} updateExpiredStatus={this.updateExpiredStatus}/>
        <ModalAddNewTask addNewTask={this.addNewTask}/>
        <ExpiredTasksModal expiredTasks={this.getExpiredTasks()}/>
      </div>
    )
  }
}

export default App
