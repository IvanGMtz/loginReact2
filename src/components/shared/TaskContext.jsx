import { createContext, useContext } from "react";

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTasks must bw used within a TaskProvider')
    }
    return context
}

export function TaskProvider({ children }) {
    return (
        <TaskContext.Provider value={{}}>
            {children}
      </TaskContext.Provider>
  );
}
