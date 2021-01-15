import React, {Component} from 'react'

// 尾部
export default class Footer extends Component {
    render() {
        const {todoCount} = this.props;
        return (
            <div className='footer'>
                <div className='footLeft'>
                    <span>{todoCount}</span>items left 
                </div>  
                <div className='footRight'>
                   <span onClick={this.showAllTodo}>All</span> 
                   <span onClick={this.showActiveTodo}>Active</span> 
                   <span onClick={this.showFinishedTodo}>Completed</span> 
                   <span onClick={this.clearFinishedTodo}>clearCompleted</span>
                </div>    

            </div>
        )
    }
    // 所有任务
    showAllTodo = () => {
        this.props.showAllTodo();
    }
    // 未完成
    showActiveTodo = () => {
        this.props.showActiveTodo()
    }
    // 完成
    showFinishedTodo = () => {
        this.props.showFinishedTodo()
    }
    // 清除已完成的任务
    clearFinishedTodo = () => {
        this.props.clearFinishedTodo()
    }
}