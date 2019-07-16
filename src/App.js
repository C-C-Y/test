import React,{ Component } from 'react';
import { observer,Provider,inject } from 'mobx-react'
import todoList from "./store/store"


@inject("todoList")

class ToDoAdd extends Component{
    add=()=>{
        console.log(new Date().getTime());
        
        this.props.todoList.todos.push({
            id:new Date().getTime(),
            title:this.refs.text.value,
            finished:false
        })
    }
    render(){
        return (
            <div>
                <input type="text" ref="text"/>
                <button onClick={this.add}>添加</button>
            </div>
        )
    }
}

@inject("todoList")
@observer
class ConShow extends Component{
    del=(todo)=>{
       this.props.todoList.todos.remove(todo)
    }
    redu=()=>{
        let num=  this.refs.num.value;
        this.props.todoList.reduce(num)
    }
    render(){
        return (
            <div>
                <List todos={this.props.todoList.todos} del={this.del}/>
                <p>你还有{this.props.todoList.unfinishedTodoCount}件事未做</p>
                <input ref="num" type="number"/>
                <button onClick={this.redu}>删</button>
            </div>
        )
    }
}


class List extends Component{
    render(){
        let ele=this.props.todos.map(todo=>
        <li key={todo.id}>
            <label>
            <input type="checkbox" checked={todo.finished} onChange={()=>{todo.finished=!todo.finished}}/>
            {todo.title}
            </label>
            <button onClick={this.props.del.bind(this,todo)}>del</button>
        </li>)
        return (
            <ul>
                {ele}
            </ul>
        )
    }
}





class App extends Component{
    render(){
        return(
           <Provider todoList={todoList}>
                <div>
                    <ToDoAdd />
                    <ConShow />
                </div>
                </Provider>
        )
    }
}


export default App;

