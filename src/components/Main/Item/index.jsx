import React, {Component} from 'react'
// 任务列表
export default  class Item extends Component{
    state = {
        currentItem: '00'
    }
    render() {
        const {currentItem} = this.state;
        const {id,isFinished,title} = this.props.todo;
        return (
            
            <div className='item'  onMouseEnter={event => this.handleEnter(id)} onMouseLeave={this.handleLeave}>
                <input type="checkbox" onChange={event => this.handleTodo(event,id)} checked={isFinished}/>
                <span className='todo'>{title}</span> 
                <div className='delete' onClick={event => this.handleDelete(id)} style={currentItem === id ? {display: 'block'} : {display: 'none'}}>X</div>   
            </div>
        )
    }
    handleTodo = (event,id) => {
        this.props.updateOneState(event.target.checked,id);    
    }
    handleEnter = (id) => {
        this.setState({
            currentItem: id
        })
    }
    handleLeave = () => {
        this.setState({
            currentItem: ''
        })
    }
    handleDelete = (id) => {
        this.props.deleteTodo(id)
    }
}