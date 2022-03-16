import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import './assets/css/grid.css';
import Home from './components/Home';
import AllTask from './components/AllTask';
import CompletedTask from './components/CompletedTask';
import store from './redux/store';
import { Provider } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/allTask', { replace: true });
  }, []);
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="allTask" element={<AllTask />} />
          <Route path="completedTask" element={<CompletedTask />} />
        </Route>
        <Route path="*" element={<Home to="/" replace />}></Route>
      </Routes>
    </Provider>
  );
}

export default App;
