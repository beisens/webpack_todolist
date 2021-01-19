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
                id: '01', title: '吃饭', isFinished: true, isShow: true
            },{
                id: '02', title: '睡觉', isFinished: false, isShow: true
            },{
                id: '03', title: '敲代码', isFinished: true, isShow: true
            }],
           
            // 存放能够前进的数据
            advanceTodos: [],
            // 存放能够后退的数据
            backTodos: []
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
        // const {filterTodolist} = this.state;
        const {todolist, advanceTodos, backTodos} = this.state;   
        // 查看任务是否全部完成
        const isAllFinished = todolist.length === 0 ? false : todolist.every(item => item.isFinished);
        // 各个组件传值的属性和方法
        const headerProps = {
            addTodo: this.addTodo,
            updateAllState: this.updateAllState,
            handleHistory: this.handleHistory,
            isAllFinished,
            advanceTodoLength: advanceTodos.length,
            backTodoLength: backTodos.length
        }
        const mainProps = {
            todolist,
            updateOneState: this.updateOneState,
            deleteTodo: this.deleteTodo,
            editTodo: this.editTodo
        }
        const footerProps = {
            todoCount: todolist.filter(item => item.isShow).length,
            showTodo: this.showTodo
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
    addTodo = async todo => {
        await this.setBackTodo()
        const todolist = JSON.parse(JSON.stringify(this.state.todolist))
        this.setState({
            todolist: [todo, ...todolist],
           
        })
    }
    // 全选状态更新
    updateAllState = async isAllFinished => {
        await this.setBackTodo()
        const todolist = JSON.parse(JSON.stringify(this.state.todolist))
        const newTodolist = todolist.map(item => {
            item.isFinished = isAllFinished;
            return item;
        });
        this.setState({
            todolist: newTodolist
        })
    }
    // 单个任务更改状态
    updateOneState = async (checked, id) => {
        
        await this.setBackTodo()
        // const {todolist} = this.state;
        // this.setBackTodo()
        // 根据id筛选任务
        const todolist = JSON.parse(JSON.stringify(this.state.todolist))
        const todoIndex = todolist.findIndex(item => item.id === id);
        const todo = todolist[todoIndex];
        todo.isFinished = checked;        
        todolist.splice(todoIndex,1,todo)
        // 更新数据
        this.setState({
            todolist
        })
        
    }
    // 渲染列表
    showTodo = async (status) => {
        
       
        const todolist = JSON.parse(JSON.stringify(this.state.todolist))
        
        // 按条件筛选渲染列表
        switch(status) {
            case 'all':
                
                this.setState({
                    todolist: todolist.map(item => {
                        item.isShow = true;
                        return item;
                    })
                });
                break;
            case 'active':
                
                this.setState({
                    todolist: this.filterTodolist(false)
                });
                break;
            case 'completed':
                this.setState({
                    todolist: this.filterTodolist(true)
                });
                break;
            case 'clearCompleted':  
                await this.setBackTodo()  
                this.setState({
                    todolist: todolist.filter(item => !item.isFinished)
                });
                break;
        }
        
    }
    // 过滤展示数据元素
    filterTodolist = (flag) => {
        return this.state.todolist.map(item => {
            if(item.isFinished) {
                item.isShow = flag;
            } else {
                item.isShow = !flag;
            }
            return item;
        })
    }
    // 删除单个任务
    deleteTodo = async id => {
        await this.setBackTodo()
        
        const {todolist} = this.state;
        const todoIndex = todolist.findIndex(item => item.id === id);
        todolist.splice(todoIndex, 1)
        this.setState({
            todolist
        })
        
    }
    // 编辑任务
    editTodo = async (id, value) => {
        await this.setBackTodo()
        
        const todolist = JSON.parse(JSON.stringify(this.state.todolist))
        // 根据id筛选任务
        const todoIndex = this.state.todolist.findIndex(item => item.id === id);
        const todo = todolist[todoIndex];
        todo.title = value;      
        todolist.splice(todoIndex,1,todo)
        // 更新数据
        this.setState({
            todolist
        })
    }
    // 前进后退历史操作
    handleHistory = flag => {
        let currentTodo;
        let {advanceTodos,backTodos, todolist} = this.state;
        // 前进操作
        if(flag && advanceTodos.length !== 0) {          
            // 把前进操作的数据弹出
            currentTodo = advanceTodos.pop();     
            // 存放在后退操作的数据中
            backTodos = [...backTodos, [...todolist]];
            
        } else if(!flag && backTodos.length !== 0) {
            // 后退操作 && backTodos.length !== 0           
            // 把后退操作的数据弹出存放在当前todo里
            currentTodo = backTodos.pop();  
            // 存放在前进操作的数据中
            advanceTodos = [...advanceTodos, [...todolist]];
        } else {
            return
        }
        // this.setBackTodo()
        // 重新设置state状态
        this.setState({
            todolist: currentTodo,
            advanceTodos,
            backTodos
        })
        
    }
    // 存放历史记录数据
    setBackTodo = () => {  
        return new Promise(resolve => {
            this.setState({
                // advanceTodos: [...this.state.advanceTodos, this.state.backTodos.slice()],
                // 复制新的todolist新数组
                backTodos: [ ...this.state.backTodos, this.state.todolist.slice()]
            }, () => resolve())
        }) 
    }
}