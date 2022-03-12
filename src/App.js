import Header from "./components/header";
import Section from "./components/section";
import { useState } from 'react'
import 'antd/dist/antd.min.css';


function App() {
  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem('TodoList')) || [])
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card card-white">
            <div className="card-body">
              <Header todo={todo} setTodo={setTodo} />
              <Section todo={todo} setTodo={setTodo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
