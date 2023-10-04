import React from 'react';
import { useTasks } from './context/TaskContext';

export default function TaskCard({task, index}){
    const { deleteTask } = useTasks();
    
  return (
      <div
        className="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div
          className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50 text-neutral-800">
          Task #{index + 1}
        </div>
        <div className="p-6">
          <h5
            className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {task.title}
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          {task.description}
          </p>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => deleteTask(task._id)}>
            Delete
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Edit
          </button>
        </div>
        <div
          className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50 text-neutral-600">
          {task.date &&
          new Date(task.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
  );
}