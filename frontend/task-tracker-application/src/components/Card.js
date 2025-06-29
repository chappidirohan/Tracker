const Card = ({ taskObj, index, deleteTask, handleEdit }) => {
  return (
    <div className="card p-3 my-3 shadow-sm " style={{ minHeight: "180px" }}>
      <div className="card-body">
        <h5 className="card-title">{taskObj.taskName}</h5>
        <p className="card-text">{taskObj.description}</p>
        <p className="card-text mb-1">
          <strong>Due Date:</strong> {taskObj.dueDate}
        </p>
        <p className="card-text">
          <strong>Status:</strong>{' '}
          <span 
            className={
              taskObj.status === "Completed"
                ? "text-success fw-bold" 
                  : "text-danger fw-bold"}>
            {taskObj.status}
          </span>
        </p>
      </div>
      <div className="d-flex justify-content-end gap-2 px-3 pb-2">
        <button 
          className="btn btn-sm btn-danger" 
          onClick={() => deleteTask()}>
          Delete
        </button>
        <button 
          className="btn btn-sm btn-primary" 
          onClick={() => handleEdit(taskObj)}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default Card;


