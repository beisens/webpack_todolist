import React, {Component} from 'react'
// 添加任务
export default class Header extends Component {
    addTodo = event => {
        const {keyCode,target:{value}} = event;
        if(keyCode === 13) {
            // 给父组件添加todo
            let todo = {id: +new Date(), title: value, isFinished: false};
            // 触发父组件中的事件
            this.props.addTodo(todo);
            // 清空添加任务项
            event.target.value = '';
        }
    }
    render() {
        const {isAllFinished} = this.props;
        return (
            <div className='header'>
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