import React, { Component } from 'react'
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import './base.css'
// 总的组件
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todolist: [{
                id: '01', title: '吃饭', isFinished: true
            },{
                id: '02', title: '睡觉', isFinished: false
            },{
                id: '03', title: '敲代码', isFinished: true
            }],
            filterTodolist: []
        }
        
    }
    componentDidMount() {
        // 复制一份到条件筛选list里
        const {todolist} = this.state
        this.setState({
            filterTodolist: todolist
        })
    }
   
    render() {
        
        const {filterTodolist} = this.state;
    
        // 查看任务是否全部完成
        const isAllFinished = filterTodolist.length === 0 ? false : filterTodolist.every(item => item.isFinished);
        // 各个组件传值的属性和方法
        const headerProps = {
            addTodo: this.addTodo,
            updateAllState: this.updateAllState,
            isAllFinished
        }
        const mainProps = {
            todolist: filterTodolist,
            updateOneState: this.updateOneState,
            deleteTodo: this.deleteTodo
        }
        const footerProps = {
            todoCount: filterTodolist.length,
            showAllTodo: this.showAllTodo,
            showFinishedTodo: this.showFinishedTodo,
            showActiveTodo: this.showActiveTodo,
            clearFinishedTodo: this.clearFinishedTodo
        }
        return (
            <div className='container'>
                <div className='title'>todos</div>
                <Header {...headerProps}/>
                <Main {...mainProps}/>
                <Footer {...footerProps}/>
            </div>
            
        )
    }
    // 添加任务
    addTodo = (todo) => {
        const {todolist} = this.state;
        this.setState({
            todolist: [todo, ...todolist],
            filterTodolist: [todo, ...todolist]
        })
    }
    // 全选状态更新
    updateAllState = isAllFinished => {
        
        const {todolist} = this.state;
        const newTodolist = todolist.map(item => {
            item.isFinished = isAllFinished;
            return item;
        });
        
        this.setState({
            todolist: newTodolist
        })
    }
    // 单个任务更改状态
    updateOneState = (checked, id) => {
        const {todolist} = this.state;
        // 根据id筛选任务
        const todoIndex = this.state.todolist.findIndex(item => item.id === id);
        const todo = todolist[todoIndex];
        todo.isFinished = checked;
        
        todolist.splice(todoIndex,1,todo)
        // 更新数据
        this.setState({
            todolist
        })

    }
    // 全部任务
    showAllTodo = () => {
        const {todolist} = this.state;
        this.setState({
            filterTodolist: todolist,
            
        })
    }
    // 已完成任务
    showFinishedTodo = () => {
        const {todolist} = this.state;
        const finshedTodo = todolist.filter(item => item.isFinished);
        this.setState({
            filterTodolist: finshedTodo,
        })
    }  
    // 未完成任务 
    showActiveTodo = () => {
        const {todolist} = this.state;
        const activeTodo = todolist.filter(item => !item.isFinished)
        this.setState({
            filterTodolist: activeTodo
        })
    }
    // 清除完成的任务
    clearFinishedTodo = () => {
        const {todolist} = this.state;
        const newtodolist = todolist.filter(item => !item.isFinished);
        this.setState({
            filterTodolist: newtodolist,
            todolist: newtodolist
        })
    }
    // 删除单个任务
    deleteTodo = (id) => {
        const {todolist} = this.state;
        const todoIndex = todolist.findIndex(item => item.id === id);
        todolist.splice(todoIndex, 1)
        this.setState({
            filterTodolist: todolist,
            todolist
        })
    }
}