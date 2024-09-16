
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
          <Route path='/about' element={<About/>}/>
          
        </Routes>
      </BrowserRouter>
  );
}

export default App;
