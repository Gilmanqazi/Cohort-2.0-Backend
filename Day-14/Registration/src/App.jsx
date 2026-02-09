import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./components/Register"
import Login from "./components/Login"
import Home from "./components/Home"

const App = () => {
return (

 <Routes>
  <Route path="/" element={<Register/>}/>
  <Route path="/home" element={<Home/>}/>
  <Route path="/login" element={<Login/>}/>
 </Routes>

 
  );
};

export default App;