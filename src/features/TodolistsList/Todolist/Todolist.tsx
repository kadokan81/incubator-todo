import React, { useCallback, useEffect } from "react";

import { TodolistDomainType, todolistsActions, todolistsThunks } from "features/TodolistsList/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/tasks.reducer";
import { TaskType } from "features/TodolistsList/todolists.api";
import { useActions } from "common/hooks";
import { AddItemForm, } from "common/components";
import { FilterTasksButtons } from "./FilterTasksButtons";
import { TodoListTitle } from "./TodoListTitle";
import { Tasks } from "./Tasks";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = React.memo(function ({ todolist, tasks }: PropsType) {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskHandler = (title: string) => {
    return addTask({ title, todolistId: todolist.id }).unwrap()
  };

  return (
    <div>
      <TodoListTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} tasks={tasks} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  );
});
