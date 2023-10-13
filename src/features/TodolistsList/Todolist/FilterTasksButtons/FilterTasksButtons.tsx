import { Button } from "@mui/material";
import { useActions } from "common/hooks";
import { TaskType } from "features/TodolistsList/todolists.api";
import { FilterValuesType, TodolistDomainType, todolistsActions } from "features/TodolistsList/todolists.reducer";
import React, { FC } from "react";
type Props = {
  todolist: TodolistDomainType;
};

export const FilterTasksButtons: FC<Props> = ({ todolist }) => {
  const { changeTodolistFilter } = useActions(todolistsActions);



  const onFilterClickHandler = (filter: FilterValuesType) => changeTodolistFilter({ filter, id: todolist.id });
  return (
    <>
      <Button
        variant={todolist.filter === "all" ? "outlined" : "text"}
        onClick={() => onFilterClickHandler("all")}
        color={"inherit"}
      >
        All
      </Button>
      <Button
        variant={todolist.filter === "active" ? "outlined" : "text"}
        onClick={() => onFilterClickHandler("active")}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={todolist.filter === "completed" ? "outlined" : "text"}
        onClick={() => onFilterClickHandler("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </>
  );
};
