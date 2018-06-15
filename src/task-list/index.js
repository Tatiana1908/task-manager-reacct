import React, { Component } from 'react'
import TaskItem from '../task'

export default class TaskList extends Component{

  render(){ 

    return(
      <ul className="tasks-wrapper"> 
        {this.props.tasksList.map((task) => {
          return <TaskItem taskItem={task} key={task.id} removeTaskHandler={this.props.removeTaskHandler} updateExpiredStatus={this.props.updateExpiredStatus}/>
  
        })
        }
      </ul>
    ) 
  }
}
