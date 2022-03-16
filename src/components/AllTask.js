import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faCheckCircle,
  faCheckDouble,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, completedSub, percentComplete } from '../redux/store';
import './AllTask.css';

const INITIAL_DATA = {
  name: 'Design UI',
  subTask: [{ name: '', isCompleted: false }],
};

const AllTask = () => {
  const allTasks = useSelector((state) => state);
  const dispatch = useDispatch();
  const [dataAdd, setDataAdd] = useState(INITIAL_DATA);

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
  const addSubTaskHandler = () => {
    if (dataAdd.subTask.length > 5) {
    } else {
      setDataAdd((prev) => ({
        ...prev,
        subTask: [...prev.subTask, { name: 'ec', isCompleted: false }],
      }));
    }
  };
  const removeSub = (props) => {
    if (dataAdd.subTask.length <= 0) {
    } else {
      let data = dataAdd;
      data.subTask.splice(props.index, 1);

      setDataAdd((prev) => ({
        ...prev,
        subTask: data.subTask,
      }));
    }
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
            <div className="col l-3 wrap-btn-left">
              <div className="modal-content__addsub" onClick={() => addSubTaskHandler()}>
                Add sub task
              </div>
              <div className="modal-content__save">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Save
              </div>
            </div>
            <div className="col l-9">
              {dataAdd.subTask.map((item, index) => (
                <div key={index} className="container-subtask">
                  <input
                    onChange={() => {}}
                    className="modal-content-subname"
                    type="text"
                    placeholder="Sub Task Name"
                  />
                  <FontAwesomeIcon
                    icon={faXmark}
                    size="2x"
                    className="container-subtask-icon"
                    onClick={() => removeSub({ index: index })}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTask;
