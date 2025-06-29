import React, { useState, useEffect } from "react";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask as deleteTaskApi,
} from "../services/taskService";

const TaskTracker = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() =>{
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    getAllTasks()
      .then((response) => setTaskList(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

   const toggle = () => {
    setModal(!modal);
    if (!modal) setEditTask(null);
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setModal(true);
  };
  
  const saveTask = (taskObj) => {
    if (editTask) {
      updateTask(editTask.id,{ ...taskObj, id: editTask.id})
        .then(() =>{
          fetchTasks();
          setEditTask(null);
          setModal(false);
        })
        .catch((error) => console.error("Error updating task", error));
  } else {
      createTask(taskObj)
        .then(() =>{
          fetchTasks();
          setModal(false);
        })
        .catch(error => console.error("Error creating task:", error));
  }
};

  const deleteTask = (id) => {
    deleteTaskApi(id)
      .then(fetchTasks)
      .catch(error => console.error("Error deleting task:", error));
};

  return (
    <>
      <div className="header text-center p-3 bg-light">
        <h3>Task Tracker Application</h3>
        <button className="btn btn-primary mt-2" 
        onClick={() => setModal(true)}>
          Create Task
        </button>
      </div>

      <div className="task-container p-4">
        {taskList.length === 0 ? (
          <p className="text-center">No tasks available. Please add a task.</p>
        ) : (
          <div className="row gx-0 gy-4">
            {taskList.map((task, index) => (
              <div
                className="col-md-4"
                key={task.id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div style={{ width: "100%", maxWidth: "400px" }}>
                  <Card
                    taskObj={task}
                    deleteTask={() => deleteTask(task.id)}
                    handleEdit={handleEdit}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && (
        <CreateTask
          modal={modal}
          toggle={toggle}
          save={saveTask}
          editTask={editTask}
        />
      )}
    </>
  );
};
export default TaskTracker;
