
import logo from './logo.svg';
import {Routes, Route, Router, BrowserRouter} from 'react-router-dom'
import './App.css';
import About from './Component/About';
import Dashboard from './Component/Dashboard'
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
