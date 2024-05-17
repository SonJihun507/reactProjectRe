import { useState } from "react";


const App = () => {
  
  const [todoList, setList] = useState([
    
    ]);

  const [title, setTitle] = useState("");
  const [explain, setExpain] = useState("");

  // const onsubmit = (event) => {
  //   event.preventDefault();
  // }

  const submitListHandler = () => {
    const newTodo = {
      id: new Date().getTime(),
      title: title,
      explain: explain,
      isDone: false
    };   
     setList([...todoList, newTodo]);
  }
  
  const deleteListhander = (id) => {
    
    const deletedList = todoList.filter(function (list) {
      return list.id != id
    });
    setList(deletedList);
  };

  const doneCancelhander = (isDone, id) => {
    const newList = todoList.map(function (list) {
      if (list.id != id) {
        return list
      } else {
        if (isDone === false) {
          list.isDone = true; 
          } 
        else if (isDone === true) {
          list.isDone = false; 
          }
          return list

      }
    }) 
    setList(newList);
    console.log(newList);
  
  };
 
  return (
    <div className="mainpage"><h2 className="title">TODOLIST</h2>
      <div className="header">
        <input type="text" placeholder="제목" autoFocus value={title} onChange={(event) => {
          setTitle(event.target.value);
        }}/>
        <input type="text" placeholder="내용" autoFocus value={explain} onChange={(event) => {
          setExpain(event.target.value);
        }}/>
    
        <button className="addButton" onClick={submitListHandler
        }>추가하기</button>
      </div>
    <div className="middlepage">
      <div className='working'><h3>---Working...</h3>
        <div className='workDoneList'>
            {todoList.map(function (list){
              if (list.isDone === true) {
                return null;
              }
              return (
              <TodoListContent 
                key={list.id} 
                list ={list}
                deleteListhander = {deleteListhander}
                doneCancelhander = {() => doneCancelhander(list.isDone, list.id)} 
                />);
            })
            }
        </div>
      </div>
      <div className='done'><h3>---Done!</h3>
        <div className='workDoneList'>
        {todoList.map(function (list){
          if (list.isDone === false) {
            return null;
          }
              return (
              <TodoListContent 
                key={list.id} 
                list ={list}
                deleteListhander = {deleteListhander} 
                doneCancelhander = {() => doneCancelhander(list.isDone, list.id)}
                />);
               
            })
            }
          </div>   
        </div>
      </div>
    </div>
      ); 
  
};

export default App

 

const TodoListContent = ({ list, deleteListhander, doneCancelhander}) => {

  const {title, explain, id} = list;
  
  let buttonLabel = "";
  if (list.isDone === true) {
    buttonLabel = "취소";
  } else {
    buttonLabel = "완료";
  };

  return <div className="listCard">
    <h3>
    {title}
    </h3>
    <p>
    {explain}
    </p>
    <div className="buttonSection">
      <button onClick={()=> deleteListhander(id)}>삭제하기</button>
      <button id="doneOrCancel" onClick={()=> doneCancelhander(id)}>{list.isDone === true? "취소" : "완료"}</button>
    </div>
  </div>
}


