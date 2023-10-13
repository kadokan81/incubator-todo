import React from "react";
import { IconButton } from "@mui/material";
import { EditableSpan } from "common/components";
import { FC } from "react";
import { Delete } from "@mui/icons-material";
import { useActions } from "common/hooks";
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/todolists.reducer";

type Props = {
  todolist: TodolistDomainType;
};
export const TodoListTitle: FC<Props> = ({ todolist }) => {
  const { removeTodolist: removeTodolistThunk, changeTodolistTitle } = useActions(todolistsThunks);

  const removeTodolistHandler = () => {
    removeTodolistThunk(todolist.id);
  };
  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ id: todolist.id, title });
  };

  return (
    <h3>
      <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler} />
      <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  );
};
