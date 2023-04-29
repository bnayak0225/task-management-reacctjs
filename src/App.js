import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./home";
import TaskList from "./TaskList";
import CreateTask from "./Create";
import TaskDetail from "./TaskDetail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,

  },
  {
    path: "/cubyts",
    element: <TaskList mode={"cubyts"}/>
  },
  {
    path: "/jira",
    element: <TaskList mode={"jira"}/>
  },
  {
    path: "/asana",
    element: <TaskList mode={"asana"}/>
  },
  {
    path: "/jira/:id",
    element: <TaskDetail mode={"jira"}/>
  },
  {
    path: "/asana/:id",
    element: <TaskDetail mode={"asana"}/>
  },
  {
    path: "/cubyts/:id",
    element: <TaskDetail mode={"cubyts"}/>
  }
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
