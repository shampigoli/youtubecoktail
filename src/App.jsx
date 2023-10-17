import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Coctail from './pages/coktail';
import Test from './pages/test';
import SideBar from './pages/sidebar';
import SignIn from './pages/SignIn';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/coctail" element={<Coctail />} />
        <Route path="/sidebar" element={<SideBar />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
