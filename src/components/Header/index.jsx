import React, {Component} from 'react'
// 添加任务
export default class Header extends Component {
    addTodo = event => {
        const {keyCode,target:{value}} = event;
        if(keyCode === 13) {
            // 给父组件添加todo
            let todo = {id: +new Date(), title: value, isFinished: false,isShow: true};
            // 触发父组件中的事件
            this.props.addTodo(todo);
            // 清空添加任务项
            event.target.value = '';
        }
    }
    render() {
        const {isAllFinished,advanceTodoLength,backTodoLength} = this.props;
        return (
            <div className='header'>
                <div className='operation'>
                    <button className={advanceTodoLength > 0 ? 'advanceActive' : 'advance'} onClick={() => this.props.handleHistory(true)}></button>
                    <button className={backTodoLength > 0 ? 'backActive' : 'back'} onClick={() => this.props.handleHistory(false)}></button>
                    
                </div>
                <input type="checkbox" checked={isAllFinished} onChange={this.updateAllState}/>
                <input onKeyDown={this.addTodo} type="text" className='addTodo' placeholder='What need to be done?'/>
            </div>
        )
    }
    updateAllState = event => {
        // 触发父组件中的方法
        this.props.updateAllState(event.target.checked)
    }
}