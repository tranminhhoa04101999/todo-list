import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faCheckCircle,
  faCheckDouble,
} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, completedSub, percentComplete } from '../redux/store';
import './AllTask.css';

const AllTask = () => {
  const allTasks = useSelector((state) => state);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const subNameChangeHandler = (e) => {};
  const addHandler = () => {
    const action = addTask({ name: 'eec' });
    dispatch(action);
  };

  const completedSubTaskHandler = (props) => {
    const action = completedSub({
      indexTask: props.indexTask,
      indexSubTask: props.indexSubTask,
    });
    dispatch(action);
  };
  const percentCompletedHandler = (props) => {
    let task = allTasks[props.index];
    let countSub = task.subTask.length;
    let countCompleted = 0;
    task.subTask.map((item) => {
      if (item.isCompleted) {
        countCompleted++;
      }
    });
    let percent = (countCompleted / countSub) * 100;
    return percent.toFixed(0);
  };
  return (
    <div className="grid container-alltask">
      <div className="row no-gutters ">
        <div className="col l-o-2 l-8 container-card">
          {allTasks.map((task, index) => {
            let percentCompleted = percentCompletedHandler({ index: index });
            return (
              <div key={index} className="card" onMouseLeave={() => setViewMode(false)}>
                <div className="card-top">
                  <div className="card-percent">
                    <svg>
                      <circle cx="50%" cy="50%" r="20px"></circle>
                      <circle
                        cx="50%"
                        cy="50%"
                        r="20px"
                        style={{ strokeDashoffset: 125 - (125 * percentCompleted) / 100 }}
                      ></circle>
                    </svg>
                    <div>{percentCompleted}%</div>
                  </div>
                  <div className="card-name">{task.name}</div>
                </div>
                <div
                  className={`card-viewmore ${viewMode ? 'card-viewmore--active' : ''}`}
                  onClick={() => setViewMode(true)}
                >
                  {viewMode ? (
                    <div className="card-viewmore-list">
                      {task.subTask.map((subTask, indexsub) => (
                        <div
                          key={indexsub}
                          className="card-viewmore-item"
                          style={{ animationDelay: `calc((${indexsub} + 1) * 0.2s )` }}
                        >
                          <div>
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              size="2x"
                              style={{
                                color: subTask.isCompleted ? 'var(--primary-color)' : '',
                              }}
                            />
                          </div>
                          <div className="card-viewmore-item__name">{subTask.name}</div>
                          {!subTask.isCompleted ? (
                            <div>
                              <FontAwesomeIcon
                                icon={faCheckDouble}
                                size="2x"
                                className="btn-checksubtask"
                                onClick={() => {
                                  completedSubTaskHandler({
                                    indexTask: index,
                                    indexSubTask: indexsub,
                                  });
                                }}
                              />
                            </div>
                          ) : (
                            'Done'
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    'View More'
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="alltask-add">
        <FontAwesomeIcon
          onClick={() => setShowModal(true)}
          className="alltask-add__icon"
          icon={faCirclePlus}
          size="4x"
        />
      </div>
      <div className={`modal ${showModal ? 'modal-show' : ''}`}>
        <div className="modal-overlay" onClick={() => setShowModal(false)}></div>
        <div className="grid modal-content">
          <div className="modal-content-wrapper-add">
            <input
              onChange={() => {}}
              className="modal-content-name"
              type="text"
              placeholder="Task Name"
            />
          </div>
          <div className="row no-gutters">
            <div className="col l-3">
              <div className="modal-content__addsub">Add sub task</div>
            </div>
            <div className="col l-9">
              <input
                onChange={() => {}}
                className="modal-content-subname"
                type="text"
                placeholder="Sub Task Name"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTask;
