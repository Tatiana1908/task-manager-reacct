import React, {Component} from 'react'

export default class ExpiredTasksModal extends Component{
  constructor(props) {
    super(props)
    this.state = {
      currentDisplayedExpiredTask: 0
    }
  }

  getPrevExpiredTask = () => {
    if(this.state.currentDisplayedExpiredTask > 0) {
      this.setState({currentDisplayedExpiredTask: this.state.currentDisplayedExpiredTask - 1})
    }
  }

  getNextExpiredTask =  () => {
    if (this.state.currentDisplayedExpiredTask < this.props.expiredTasks.length -1 ){
      this.setState({currentDisplayedExpiredTask: this.state.currentDisplayedExpiredTask + 1})
    }
  }

  onClickToRemoveBtn = e => {
    e.preventDefault()
      if(this.state.currentDisplayedExpiredTask > 0 ){
        this.setState({currentDisplayedExpiredTask: this.state.currentDisplayedExpiredTask - 1})
      }else{
        this.setState({currentDisplayedExpiredTask: 0})
      }

      this.props.removeTask(this.props.expiredTasks[this.state.currentDisplayedExpiredTask].id)
  }

  render(){
    let indexOfCurrentTask = this.state.currentDisplayedExpiredTask;
    let prevBtnClass = !indexOfCurrentTask ? 'prev hidden' : 'prev';
    let nextBtnClass = (indexOfCurrentTask === this.props.expiredTasks.length - 1)? 'next hidden' : 'next';
    return(
      <div>
        {this.props.expiredTasks.length ?
        <div className="expired-tasks-overlay">
          <div className="expired-tasks-modal">
            <span className="number">{indexOfCurrentTask + 1}</span>
            <h2 className="warning-text">Task {this.props.expiredTasks[indexOfCurrentTask].description} expired!</h2>
            <button className="btn-default" onClick={this.onClickToRemoveBtn}>Remove</button>
            <span className={prevBtnClass} onClick={this.getPrevExpiredTask}>&#8249;</span>
            <span className={nextBtnClass} onClick={this.getNextExpiredTask}>&#8250;</span>
          </div>  
        </div>
        : null
        }
      </div>
    )
  }

}