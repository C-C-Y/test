import {observable,computed, action,autorun} from "mobx"
class Todo {
    @observable todos = [
         {
            id: 1,
            title: '任务1',
            finished: false
        }, {
            id: 2,
            title: '任务2',
            finished: false
        } 
    ];

    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
    @action reduce(num){
        console.log(this.todos.length);
        
      const length = this.todos.length;
      this.todos.splice(length-num-1,num)
    }
    
}
let todoList =  new Todo();
autorun(()=>{
    console.log(todoList.todos.length);
    
})

export default todoList