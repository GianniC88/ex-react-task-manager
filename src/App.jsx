import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import { GlobalContextProvider } from "./context/GlobalContext"
import TaskList from "./pagine/TaskList"
import AddTask from "./pagine/AddTask"
import TaskDetail from "./pagine/TaskDetail"


function App() {


  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <nav className="navbar">
          <NavLink to="/">Le mie Task</NavLink>
          <NavLink to="/add">Aggiungi Task </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/task/:id" element={<TaskDetails />} />

        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>

  )
}

export default App
