import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Home from "./Home.js"
import Customers from "./Customers.js"
function App() {
  return (
    // <>
    <Router>
      <Routes>
        <Route path='/' exact element={<Home />}></Route>
        <Route path='/customers' exact element={<Customers />}></Route>
      </Routes>
    </Router>
    // </>
  );
}

export default App;
