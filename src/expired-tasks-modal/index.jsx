import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ExpiredTasksModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDisplayedExpiredTask: 0,
    }
    this.getPrevExpiredTask = this.getPrevExpiredTask.bind(this)
    this.getNextExpiredTask = this.getNextExpiredTask.bind(this)
    this.onClickToRemoveBtn = this.onClickToRemoveBtn.bind(this)
  }

  onClickToRemoveBtn(e) {
    e.preventDefault()
    if (this.state.currentDisplayedExpiredTask > 0) {
      this.setState({ currentDisplayedExpiredTask: this.state.currentDisplayedExpiredTask - 1 })
    } else {
      this.setState({ currentDisplayedExpiredTask: 0 })
    }
    this.props.removeTask(this.props.expiredTasks[this.state.currentDisplayedExpiredTask].id)
  }

  getPrevExpiredTask(e) {
    e.preventDefault()
    if (this.state.currentDisplayedExpiredTask > 0) {
      this.setState({ currentDisplayedExpiredTask: this.state.currentDisplayedExpiredTask - 1 })
    }
  }

  getNextExpiredTask(e) {
    e.preventDefault()
    if (this.state.currentDisplayedExpiredTask < this.props.expiredTasks.length - 1) {
      this.setState({ currentDisplayedExpiredTask: this.state.currentDisplayedExpiredTask + 1 })
    }
  }

  render() {
    const expiredTasksList = this.props.expiredTasks
    const indexOfCurrentTask = this.state.currentDisplayedExpiredTask
    const prevBtnClass = !indexOfCurrentTask ? 'prev hidden' : 'prev'
    const nextBtnClass = (indexOfCurrentTask === expiredTasksList.length - 1) ? 'next hidden' : 'next'

    return (
      <div>
        {this.props.expiredTasks.length ?
          <div className="expired-tasks-overlay">
            <div className="expired-tasks-modal">
              <span className="number">{indexOfCurrentTask + 1}</span>
              <h2 className="warning-text">Task {expiredTasksList[indexOfCurrentTask].description} expired!</h2>
              <button className="btn-default" onClick={this.onClickToRemoveBtn}>Remove</button>
              <button className={prevBtnClass} onClick={this.getPrevExpiredTask}>&#8249;</button>
              <button className={nextBtnClass} onClick={this.getNextExpiredTask}>&#8250;</button>
            </div>
          </div>
          : null
        }
      </div>
    )
  }
}

ExpiredTasksModal.propTypes = {
  expiredTasks: PropTypes.array,
  removeTask: PropTypes.func,
}
