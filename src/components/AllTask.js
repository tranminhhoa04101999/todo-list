import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import './AllTask.css';

const AllTask = () => {
  const [data, setData] = useState({
    name: '',
    subTask: [{ name: '', isCompleted: false }],
  });
  const nameChangeHandler = (event) => {
    setData((prev) => ({ ...prev, name: event.target.value }));
  };
  const [showModal, setShowModal] = useState(false);
  const subNameChangeHandler = (e) => {};
  const addHandler = () => {};
  return (
    <div className="grid container-alltask">
      <div className="row">
        <div className="alltask-header"></div>
        <div className="alltask-main"></div>
      </div>
      <div className="alltask-add">
        <FontAwesomeIcon
          onClick={() => setShowModal(true)}
          className="alltask-add__icon"
          icon={faCirclePlus}
          size="4x"
        />
      </div>
      <div className={`modal ${showModal ? 'modal-show' : 'modal-close'}`}>
        <div className="modal-overlay" onClick={() => setShowModal(false)}></div>
        <div className="grid modal-content">
          <div className="modal-content-wrapper-add">
            <input
              onChange={nameChangeHandler}
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
