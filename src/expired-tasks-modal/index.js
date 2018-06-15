import React, {Component} from 'react'

export default class ExpiredTasksModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      currentDisplayedExpiredTask: 0
    }
    this.expiredTasks = this.props.expiredTasks
  }

  componentWillReceiveProps = () => {
    this.expiredTasks = this.props.expiredTasks
  }

  getPrevExpiredTask = () => {
    if(this.state.currentDisplayedExpiredTask > 0) {
      this.setState({currentDisplayedExpiredTask: this.state.currentDisplayedExpiredTask - 1})
    }
    
  }

  getNextExpiredTask =  () => {
    
    if (this.state.currentDisplayedExpiredTask < this.expiredTasks.length -1 ){
      this.setState({currentDisplayedExpiredTask: this.state.currentDisplayedExpiredTask + 1})
      console.log(this.expiredTasks.length)
    }
  
  }

  render(){
    console.log(this.expiredTasks.length)
    return(
      <div>
        {this.expiredTasks.length ?
        <div className="expired-tasks-overlay">
          <div className="expired-tasks-modal">
            <span className="number">{this.state.currentDisplayedExpiredTask + 1}</span>
            <span className="prev" onClick={this.getPrevExpiredTask}>Prev</span>
            <span className="next" onClick={this.getNextExpiredTask}>Next</span>
            <span className="description">{this.expiredTasks[this.state.currentDisplayedExpiredTask].description}</span>
            <button className="remove-task">Remove</button>
          </div>  
        </div>
        : null
        }
      </div>
    )
  }

}