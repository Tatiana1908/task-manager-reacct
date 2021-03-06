import React from 'react'
import PropTypes from 'prop-types'
import TaskItem from '../task/index'

export default function TaskList(props) {
  return (
    <ul className="tasks-wrapper">
      {props.tasksList.map(task => (<TaskItem
        taskItem={task}
        key={task.id}
        removeTask={props.removeTask}
        updateExpiredStatus={props.updateExpiredStatus}
      />))}
    </ul>
  )
}

TaskList.propTypes = {
  tasksList: PropTypes.array,
  updateExpiredStatus: PropTypes.func,
  removeTask: PropTypes.func,
}
