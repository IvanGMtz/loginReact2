import { useForm } from "react-hook-form";
import { useTasks } from "../shared/context/TaskContext";

function TaskFormPage() {

  const { register, handleSubmit } = useForm();

  const { tasks, createTask } = useTasks();
  console.log(tasks, createTask);
  
  const onSubmit = handleSubmit((data) => {
    createTask(data);
  })

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          autoFocus
        />
        <textarea
          placeholder="Description"
          rows="3"
          {...register("description")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>

        <input
          type="date"
          {...register("date")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />

        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Save
        </button>
      </form>
    </div>
  );
}

export default TaskFormPage