import React, {Component,Fragment} from 'react'
// 任务列表
export default  class Item extends Component{
    state = {
        currentItem: '00',
        isEdit: false
    }
    render() {
        const {currentItem,isEdit} = this.state;
        const {id,isFinished,title,isShow} = this.props.todo;
        return (
            <Fragment>
            { isShow && <div className='item'  onMouseEnter={() => this.handleEnter(id)} onMouseLeave={this.handleLeave}>
                
                {
                    !isEdit ?
                    <Fragment>
                        <input type="checkbox" onChange={event => this.props.updateOneState(event.target.checked,id)} checked={isFinished}/>
                        <span onDoubleClick={this.handleEdit} className='todo' >{title}</span> 
                    </Fragment> : 
                    <input type="text" className='edit' onBlur={event => this.handleBlur(event,id)} ref={inputEle => this.inputEle = inputEle}/>
                }
                
                <div className='delete' onClick={() => this.props.deleteTodo(id)} style={currentItem === id ? {display: 'block'} : {display: 'none'}}>X</div>   
            </div>}
            </Fragment> 
        )
    }
    // 鼠标移入显示删除
    handleEnter = id => {
        this.setState({
            currentItem: id
        })
    }
    // 移出隐藏
    handleLeave = () => {
        this.setState({
            currentItem: ''
        })
    }
    // 编辑任务
    handleEdit = event => {
        this.setState({
            isEdit: true
        },() => {
            this.inputEle.value = event.target.innerHTML;
            this.inputEle.select()
        })
    }
    // 失焦更新数据
    handleBlur = (event,id) => {
        this.setState({
            isEdit: false
        })
        this.props.editTodo(id, event.target.value)
    }
}