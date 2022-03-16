import React from 'react';
import './Home.css';
import background from '../assets/img/background_batman.jpg';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, Outlet } from 'react-router-dom';

const Home = () => {
  const [theme, setTheme] = useState('--light-mode');
  const [textColor, setTextColor] = useState('--text-light-mode');
  const [mode, setMode] = useState(false);

  useEffect(() => {
    if (mode) {
      setTheme('--dark-mode');
      setTextColor('--text-dark-mode');
    } else if (!mode) {
      setTheme('--light-mode');
      setTextColor('--text-light-mode');
    }
  }, [mode]);

  return (
    <div className="contaier-app">
      <img src={background} alt="" className="background"></img>
      <div className="grid wide wrapper-app">
        <div className="row app-header">
          <div className="col l-4">
            <div className="app-header-name"> Trần Minh Hòa</div>
          </div>
          <div className="col l-4 ">
            <div className="app-header-title">Todo List</div>
          </div>
          <div className="col l-4 ">
            <div className="app-header-setting">
              <FontAwesomeIcon
                onClick={() => setMode((prev) => !prev)}
                className="app-header-setting__icon"
                icon={faGear}
                size="2x"
              />
            </div>
          </div>
        </div>
        <div className="row no-gutters app-main">
          <div className="col l-3 app-main-left">
            <ul className="app-main-left-menu">
              <li className="app-main-left-item">
                <NavLink
                  to="allTask"
                  className={(data) =>
                    'navlink' + (data.isActive ? ' navlink--active' : '')
                  }
                >
                  All Tasks
                </NavLink>
              </li>
              <li className="app-main-left-item">
                <NavLink
                  className={(data) =>
                    'navlink' + (data.isActive ? ' navlink--active' : '')
                  }
                  to="completedTask"
                >
                  Completed Tasks
                </NavLink>
              </li>
            </ul>
          </div>
          <div
            className="col l-9 app-main-right"
            style={{ backgroundColor: `var(${theme})` }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
