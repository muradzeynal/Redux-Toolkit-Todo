import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState , useEffect} from 'react'
import { useDispatch , useSelector } from "react-redux";
import {add , remove , toggleCompleted} from './redux/reducers/todoSlice'
import {fetchUser} from './redux/reducers/userSlice'


function App() {
  const todos = useSelector((state) => state.todos);
  const user = useSelector((state) => state.user);
   

  useEffect(()=>{
    dispatch(fetchUser())
  }, [])

  const dispatch = useDispatch();

  const [task , setTask] = useState('')

  const addTask = () => {
    dispatch(add(task))
    setTask('')
  }

  return (
    <div className="App container p-5">
        {user.loading ? 
          <p>Loading .....</p>
          :
          !user.error ?
          <h1>{user.data.first_name } welcome</h1> : 
          <h1> {user.error} </h1>
        }
        <div className='card mb-4'>
          <div className='d-flex card-body'>
            <div class="form-group w-100 mx-sm-3 mb-2">
              <input value={task} onChange={(e)=> setTask(e.target.value) } type="text" class="form-control" id="task" placeholder="ADD TASK HERE" />
            </div>
            <button onClick={()=>{addTask()}} type="submit" class="btn btn-primary mb-2">Add</button>
          </div>
        </div>


        <ul class="list-group">
          {todos.map((todo , index)=>(
            <li key={index} class="list-group-item">
              <div className='d-flex align-items-center justify-content-between'>
                <div>{todo.task}</div>
                <div>{todo.completed ? 'Completed' : 'UnCompleted'}</div>
                <div>
                  <div onClick={()=>{dispatch(remove(todo.id))}} className='btn me-2 btn-danger'>Remove</div>
                  <div onClick={()=>{dispatch(toggleCompleted(todo.id))}}  className='btn me-2 btn-success'>{todo.completed ? 'Un Complete' : 'Complete'}</div>
                </div>
              </div>
            </li>
          ))}
          
        </ul>
    </div>
  );
}

export default App;
