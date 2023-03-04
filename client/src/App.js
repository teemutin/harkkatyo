import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"
import Indexpage from './components/pages/Indexpage';
import Loginpage from './components/pages/Loginpage';
import Registerpage from './components/pages/Registerpage';
import Makepostpage from './components/pages/Makepostpage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Topbar from './components/Topbar';


function App() {
  //fetch all posts in db and put them on display
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch("/api/allbooks")
    .then(response => response.json())
    .then(json => setPosts(json))
    //console.log(books)
  }, [])

  //render app, with all the routes available
  return (
    <Router>
    <div className="App">
      <Topbar/>

      
    </div>
    <Routes>
      <Route path="/makepost" element={<Makepostpage/>}/>
      <Route path="/" element={<Indexpage/>}/>
      <Route path="/login" element={<Loginpage/>}/>
      <Route path="/register" element={<Registerpage/>}/>
    </Routes>
    </Router>
  );
}
//<Indexpage/>

export default App;
