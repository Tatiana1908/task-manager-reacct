import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TaskItem extends Component {
  constructor(props) {
    super(props)
    this.runTimer = this.runTimer.bind(this)
    this.onRemoveHandler = this.onRemoveHandler.bind(this)
    this.interval = ''
  }

  onRemoveHandler(e) {
    e.preventDefault()
    this.props.removeTask(this.props.taskItem.id)
  }

  runTimer() {
    const msInHour = 3600000
    const msInMinute = 60000
    const msInSecond = 1000
    this.time = Date.parse(this.props.taskItem.date)
    let interval

    function handleOnTimeOver() {
      clearInterval(interval)
    }

    interval = setInterval(() => {
      if (!this.timerElement) return clearInterval(interval)
     
      if (((this.time - Date.now()) > 0)) {
        const hours = (this.time - Date.now()) / msInHour
        const minutes = ((this.time - Date.now()) % msInHour) / msInMinute
        const seconds = (((this.time - Date.now()) % msInHour) % msInMinute) / msInSecond
        this.timerElement.innerHTML = `${parseInt(hours, 10)} : ${parseInt(minutes, 10)} : ${parseInt(seconds, 10)}`

        return true
      }
      if (this.props.taskItem.expired) return null

      this.props.updateExpiredStatus(this.props.taskItem.id)
      handleOnTimeOver()
      this.timerElement.innerHTML = '00 : 00 : 00'

      return true
    }, 1000)
  }

  render() {
    const { description, id } = this.props.taskItem

    return (
      <li className="task-item" id={id}>
        {description &&
        <div className="task-item-content">
          <span className="task-desc">{description}</span>
          <span
            className="time"
            ref={node => (this.timerElement = node)}
          >wait
          </span>
          <button className="remove-item-btn" onClick={this.onRemoveHandler} >+</button>
          {this.runTimer()}
        </div>
        }
      </li>
    )
  }
}

TaskItem.propTypes = {
  taskItem: PropTypes.shape({
    date: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    expired: PropTypes.bool,
  }),
  updateExpiredStatus: PropTypes.func,
  removeTask: PropTypes.func,
  handleOnTimeOver: PropTypes.func,


}
