import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"
import Indexpage from './components/pages/Indexpage';
import Loginpage from './components/pages/Loginpage';
import Registerpage from './components/pages/Registerpage';
import Makepostpage from './components/pages/Makepostpage';
import Postpage from './components/pages/Postpage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Topbar from './components/Topbar';
import { useTranslation } from 'react-i18next';
import './i18n';


//simple "root" app, with all the routes available
function App() {
  const { t, i18n } = useTranslation();
  
  
  return (
    <Router>
    <div className="App">
      <Topbar/>

      
    </div>
    <Routes>
      <Route path="/post/:header" element={<Postpage/>}/>
      <Route path="/makepost" element={<Makepostpage/>}/>
      <Route path="/" element={<Indexpage/>}/>
      <Route path="/login" element={<Loginpage />}/>
      <Route path="/register" element={<Registerpage/>}/>
    </Routes>
    </Router>
  );
}


//<Route path="/" element={<Indexpage setToken={setToken}/>}/>
export default App;
