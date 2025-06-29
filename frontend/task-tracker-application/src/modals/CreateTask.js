import { useState, useEffect } from "react";

const CreateTask = ({ modal, toggle, save, editTask }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    if (editTask) {
      setTaskName(editTask.taskName || "");
      setDescription(editTask.description || "");
      setDueDate(editTask.dueDate || "");
      setStatus(editTask.status || "pending");
    } else {
      setTaskName("");
      setDescription("");
      setDueDate("");
      setStatus("Pending");
    }
  }, [editTask, modal]);

  useEffect(() => {
    if (dueDate) {
      const today = new Date().toISOString().split("T")[0];
      setStatus(dueDate < today ? "Completed" : "Pending");
    }
  }, [dueDate]);

  const validateForm = () => {
    let valid = true;

    if (!taskName.trim()) {
      setTitleError("Title is required.");
      valid = false;
    } else {
      setTitleError("");
    }

    if (!description.trim()) {
      setDescriptionError("Description is required.");
      valid = false;
    } else {
      setDescriptionError("");
    }
    return valid;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const taskObj = {
        taskName: taskName,
        description: description,
        dueDate: dueDate,
        status: status,
      };
      save(taskObj);
    }
  };

  if (!modal) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editTask ? "Edit Task" : "Create Task"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={toggle}
            ></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="form-group mb-3">
                <label>Title</label>
                <input
                  type="text"
                  className={`form-control ${titleError ? "is-invalid" : ""}`}
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
                {titleError && (
                  <div className="invalid-feedback">{titleError}</div>
                )}
              </div>

              <div className="form-group mb-3">
                <label>Description</label>
                <input
                  type="text"
                  className={`form-control ${
                    descriptionError ? "is-invalid" : ""
                  }`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {descriptionError && (
                  <div className="invalid-feedback">{descriptionError}</div>
                )}
              </div>

              <div className="form-group mb-3">
                <label>Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div className="form-group mb-2">
                <label>Status</label>
                <input
                  type="text"
                  className="form-control"
                  value={status}
                  readOnly
                />
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button className="btn btn-primary" onClick={handleSave}>
              {editTask ? "Update" : "Create"}
            </button>
            <button className="btn btn-secondary" onClick={toggle}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
