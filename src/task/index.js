import React, {Component} from 'react'

export default class TaskItem extends Component{
 
  runTimer(){
    const msInHour = 3600000
    const msInMinute = 60000
    const msInSecond = 1000
    this.time = Date.parse(this.props.taskItem.date)

    // this.timerElement.textContent = 'wait'
    
    let interval = setInterval(() => {

      if ((this.time - Date.now()) > 0){

        let hours = (this.time - Date.now()) /  msInHour
        let minutes = ((this.time - Date.now()) % msInHour) / msInMinute
        let seconds = (((this.time - Date.now()) % msInHour) % msInMinute) / msInSecond

        return this.timerElement.textContent = `${parseInt(hours, 10)} : ${parseInt(minutes, 10)} : ${parseInt(seconds, 10)}`

      }else{
        if(this.props.taskItem.expired) {
          return 
        }
        this.props.updateExpiredStatus(this.props.taskItem.id)
        handleOnTimeOver()

        return this.timerElement.textContent = '00 : 00 : 00'
      }
    }, 1000)

    function handleOnTimeOver() {
      clearInterval(interval)
    }
   
  }
  
  render(){
    const { description, id } = this.props.taskItem
    
    return(
      <li className="task-item" id={id}>
        {description &&
        <div className="task-item-content">
          <span className="task-desc">{description}</span> 
          <span className="time" ref={ref => (this.timerElement = ref)}></span>
          <span className="remove-item-btn" onClick = {() => this.props.removeTaskHandler(id)} >+</span>
          {this.runTimer()}
        </div>
        }
      </li>
    )
  }
}