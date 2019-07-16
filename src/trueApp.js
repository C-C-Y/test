import React, { Component } from 'react';
import './App.css';

import { observer,Provider,inject } from 'mobx-react'
import todoList from "./store/store"

//数据结构



@observer
class TodoListView extends Component {
    delClick = (todo)=>{ 
      this.props.todoList.todos.remove(todo);
    };
    render() {

        return (
            <div>
                <ul>
                    {this.props.todoList.todos.map(todo =>
                        <TodoView todo={todo} delClick={this.delClick} key={todo.id}/>
                    )}
                </ul>
                未完成任务数：{this.props.todoList.unfinishedTodoCount}
            </div>
        )

    }
}

@observer
class TodoView extends Component {
    componentWillReact() {
        console.log('I will re-render, since the todo has changed!');

    }
    render() {
        var todo = this.props.todo;
        return (
            <li>
                <label>
                    <input
                        type="checkbox"
                        checked={todo.finished}
                        onClick={() => todo.finished = !todo.finished}
                    />

                    {todo.title}
                </label>
                <button onClick={() => {this.props.delClick(todo)}}>del</button>
            </li>
        )
    }

}





@inject('todoList')
class ToDoApp extends Component{
    render(){
        return (
            <div>
                <TodoListView todoList={this.props.todoList}/>
            </div>
        );
    }
}

@inject('todoList')
@observer
class ToDoAdd extends Component{
    todoList = this.props.todoList;
    add=()=>{

        const title = this.refs.task.value;

        if(!title.length){
            alert('任务名字不能为空');
            return;
        }
        todoList.todos.push({
            id: 3, //临时
            title: this.refs.task.value,
            finished: false
        })
    };
    render(){
        return(
            <div>
                <input type="text" ref='task'/>
                <button onClick={this.add}>添加</button>
            </div>
        )
    }
}


class App extends Component{
    render(){
        return(
           <Provider todoList={todoList}>
                <div>
                    <ToDoAdd />
                    <ToDoApp />
                </div>
                </Provider>
        )
    }
}


export default App;
