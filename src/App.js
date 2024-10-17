import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Attend from './pages/attend';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>LAMS</h1>
      </header> 
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/attend" element={<Attend/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
