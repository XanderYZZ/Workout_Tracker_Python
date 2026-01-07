import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom"; 
import Home from './pages/Home';

function App() {
  return (
    <>
      <Home />
    </>
  )
}

export default App