import React, { useState, useEffect } from 'react';
import './CompletedTask.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
const CompletedTask = () => {
  const allTasks = useSelector((state) => state);
  const [viewMode, setViewMode] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState([]);

  useEffect(() => {
    let dataList = [];

    allTasks.map((item) => {
      let check = item.subTask.filter((data) => data.isCompleted === false);
      if (check.length === 0) {
        dataList.push(item);
      }
    });
    setTaskCompleted(dataList);
  }, []);

  const percentCompletedHandler = (props) => {
    let task = taskCompleted[props.index];
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
          {taskCompleted.map((task, index) => {
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
                                onClick={() => {}}
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
      ;
    </div>
  );
};

export default CompletedTask;
