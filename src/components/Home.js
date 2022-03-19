import React from 'react';
import './Home.css';
import background from '../assets/img/background_batman.jpg';
import { faGear, faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, Outlet } from 'react-router-dom';

const Home = () => {
  const [theme, setTheme] = useState('--light-mode');
  const [textColor, setTextColor] = useState('--text-light-mode');
  const [mode, setMode] = useState(false);
  const [menuClick, setMenuClick] = useState(true);

  useEffect(() => {
    if (mode) {
      setTheme('--dark-mode');
      setTextColor('--text-dark-mode');
    } else if (!mode) {
      setTheme('--light-mode');
      setTextColor('--text-light-mode');
    }
  }, [mode]);

  const barsmenuOnclick = () => {
    setMenuClick(!menuClick);
  };
  return (
    <div className="contaier-app">
      <img src={background} alt="" className="background"></img>
      <div className="grid wide wrapper-app">
        <div className="row app-header">
          <div className="col l-4 m-4 c-4">
            <div className="app-header-name"> Trần Minh Hòa</div>
            <div className="app-header-bars">
              <FontAwesomeIcon
                icon={menuClick ? faBars : faX}
                size="2x"
                onClick={barsmenuOnclick}
              />
            </div>
          </div>
          <div className="col l-4 m-4 c-4">
            <div className="app-header-title">Todo List</div>
          </div>
          <div className="col l-4 m-4 c-4">
            <div className="app-header-setting">
              <FontAwesomeIcon
                // onClick={() => setMode((prev) => !prev)}
                className="app-header-setting__icon"
                icon={faGear}
                size="2x"
              />
            </div>
          </div>
        </div>
        <div className="row no-gutters app-main">
          <div className="col l-3 m-3 c-12 app-main-left">
            <ul
              className={`app-main-left-menu ${
                menuClick ? 'app-main-left--noactive' : 'app-main-left--active'
              }`}
            >
              <li className="app-main-left-item">
                <NavLink
                  to={{ pathname: '/allTask' }}
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
            className="col l-9 m-9 c-12 app-main-right"
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
