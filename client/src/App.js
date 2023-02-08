import './App.css';
import Auth from './views/Auth'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Dashboard'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route 
            path="/"
            element={
                <Home />
            }
          />
          <Route element={<Auth/>} path={"/auth"}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
