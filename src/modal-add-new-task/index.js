import React, {Component} from 'react'

export default class ModalAddNewTask extends Component{
  state = {
    open: false
  }

  handlerOnClickToAddTaskBtn = () => {
    this.setState({open: true})
  }

  handlerOnClickToCancelAddTask = (e) => {
    e.preventDefault()
    this.setState({open: false})
  }

  createTaskHandler = (e) => {
    e.preventDefault()
    let taskDescription = this.descriptionInput.value,
      taskDate = this.dateInput.value,
      correct = true
  
    if (!taskDescription || !taskDate){
      this.errorBlock.textContent = 'Empty field!';
      correct = false
    }else if (!Date.parse(taskDate) || (Date.now() > Date.parse(taskDate))) {
      this.errorBlock.textContent = 'Incorrect format of date!';
      correct = false;
    }

    if (correct) {
      let newTaskData = {
        description: taskDescription,
        date: taskDate,
        expired: false,
        id: Date.now()
      };

      this.errorBlock.textContent = '';

      this.props.addNewTask(newTaskData)
      this.setState({open: false})
    }
  }
  handlerOnClickToModal(event){
    event = event || window.event;
    event.stopPropagation && event.stopPropagation()
  }

  render(){
    return(
      <div>
        <div className="add-task-btn" onClick={this.handlerOnClickToAddTaskBtn}>+</div>
        {this.state.open && 
          <div className="add-task-overlay" onClick={this.handlerOnClickToCancelAddTask}>
            <div className="add-task-modal" onClick={this.handlerOnClickToModal}>
              <form action="" >
                <div className="input-block">
                  <span>Description: </span>
                  <input type="text" name="description" placeholder="Enter task description" className="input-default" ref={node => this.descriptionInput = node}/>
                </div>
                <div className="input-block">
                  <span>Date: </span>
                  <input type="text" name="date" placeholder="yyyy-mm-dd h:m:s" className="input-default" ref={node => this.dateInput = node}/>
                </div>
                <div className="error-wrap" ref={node => (this.errorBlock = node)}></div>
                <button className="btn-default" onClick={this.handlerOnClickToCancelAddTask}>CANCEL</button>
                <button className="btn-default" onClick={this.createTaskHandler}>ADD</button>
              </form>
            </div>
          </div>
        }
      </div>
    )
  }
}