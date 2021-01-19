import React, {Component} from 'react'
import Item from './Item'
// 主体任务内容
export default class Main extends Component {  

    render() {
        const {updateOneState,deleteTodo,editTodo} = this.props;
        return (
            <div className='listBox'>    
                {
                    this.props.todolist.map(item => {
                        return (
                            <Item key={item.id} todo={item} 
                            updateOneState={updateOneState}
                            deleteTodo={deleteTodo}
                            editTodo={editTodo}/>
                        )
                    })
                }
            </div>
        )
    }
}