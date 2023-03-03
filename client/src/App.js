import logo from './logo.svg';
import './App.css';
import Indexpage from './components/pages/Indexpage';
import Loginpage from './components/pages/Loginpage';
import Registerpage from './components/pages/Registerpage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Topbar from './components/Topbar';


function App() {
  return (
    <Router>
    <div className="App">
      <Topbar/>
      
    </div>
    <Routes>
      <Route path="/" element={<Indexpage/>}/>
      <Route path="/login" element={<Loginpage/>}/>
      <Route path="/register" element={<Registerpage/>}/>
    </Routes>
    </Router>
  );
}
//<Indexpage/>

export default App;
