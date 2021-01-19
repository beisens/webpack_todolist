import React, {Component} from 'react'

// 尾部
export default class Footer extends Component {
    state = {currentHandle: 'all'}
    render() {
        const {todoCount} = this.props;
        const {currentHandle} = this.state;
        return (
            <div className='footer'>
                <div className='footLeft'>
                    <span>{todoCount}</span>items left 
                </div>  
                <div className='footRight'>
                   <span className={currentHandle === 'all' ? 'handleActive': ''} onClick={() => this.handleClick('all')}>All</span> 
                   <span className={currentHandle === 'active' ? 'handleActive': ''} onClick={() => this.handleClick('active')}>Active</span> 
                   <span className={currentHandle === 'completed' ? 'handleActive': ''} onClick={() => this.handleClick('completed')}>Completed</span> 
                   <span className={currentHandle === 'clearCompleted' ? 'handleActive': ''} onClick={() => this.handleClick('clearCompleted')}>ClearCompleted</span>
                </div>    
            </div>
        )
    }
    handleClick = (flag) => {
        this.props.showTodo(flag)
        this.setState({
            currentHandle: flag
        })
    }
}