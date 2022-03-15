import { Routes, Route } from 'react-router-dom';
import './App.css';
import './assets/css/grid.css';
import Home from './components/Home';
import AllTask from './components/AllTask';
import CompletedTask from './components/CompletedTask';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="allTask" element={<AllTask />} />
        <Route path="completedTask" element={<CompletedTask />} />
      </Route>
      <Route path="*" element={<Home to="/" replace />}></Route>
    </Routes>
  );
}

export default App;
