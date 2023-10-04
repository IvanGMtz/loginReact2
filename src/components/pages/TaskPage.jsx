import { useEffect } from "react";
import { useTasks } from "../shared/context/TaskContext"
import TaskCard from "../shared/TaskCard";

function TaskPage() {

  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks()
  }, []);

  return (
    <>
      {tasks.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <h1 className="font-bold text-xl">
              No tasks yet, please add a new task
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
        {
          tasks.map((task, index) => (
            <TaskCard task={task} key={task._id} index={index} />
          ))
        }
      </div>
    </>
  );
}

export default TaskPage