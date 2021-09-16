import React, { useState } from "react";
import styled from "styled-components";

const TodoContainer = styled.div`
  width: 500px;
  margin: 0 auto;
  border: 1px solid #808080;
  border-radius: 8px;
`;

const Title = styled.h1`
  display: flex;
  color: #2894ff;
  align-items: center;
  justify-content: center;
`;

const TodoAdd = styled.div`
  justify-content: center;
  display: flex;
  padding: 8px;
`;

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid black;
`;

const TodoContent = styled.div`
  color: #00bfff;
  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through;
    color: #808080;
  `}
`;

const TodoButton = styled.div``;

const TodoItemButton = styled.button`
  padding: 6px;
  color: black;
  cursor: pointer;

  &:hover {
    color: red;
  }

  & + & {
    margin-left: 4px;
  }
`;

const TodoDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DisplayButton = styled.button`
  padding: 6px;
  border: none;
  cursor: pointer;
  margin: 6px;
  background: white;

  & + & {
    margin-left: 8px;
  }
`;

const ClearAllButton = styled.button`
  padding: 8px;
  display: flex;
  margin: 0 auto;
  cursor: pointer;
  background: #52170b;
  color: #ff0066;
  border: none;
  border-radius: 8px;
`;

function TodoItem({
  todo,
  handleDeleteTodo,
  handleToggleIsDone,
  handleEditClick,
}) {
  return (
    <TodoItemWrapper>
      <TodoContent $isDone={todo.isDone}>{todo.content}</TodoContent>
      <TodoButton>
        <TodoItemButton
          onClick={() => {
            handleToggleIsDone(todo.id);
          }}
        >
          {todo.isDone ? "未完成" : "已完成"}
        </TodoItemButton>
        <TodoItemButton
          onClick={() => {
            handleEditClick(todo.id);
          }}
        >
          編輯
        </TodoItemButton>
        <TodoItemButton
          onClick={() => {
            handleDeleteTodo(todo.id);
          }}
        >
          刪除
        </TodoItemButton>
      </TodoButton>
    </TodoItemWrapper>
  );
}

let id = 1;
function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [display, setDisplay] = useState("all");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const DISPLAY_MAP = {
    all: (todo) => todo,
    isDone: (todo) => todo.isDone,
    unDone: (todo) => !todo.isDone,
  };

  const handleButtonClick = () => {
    if (value === "" || value.length > 20)
      return alert("請勿為空、文字請控制在 20 字元內");
    if (editId) {
      setTodos(
        todos.map((todo) => {
          if (todo.id === editId) {
            return {
              ...todo,
              content: value,
            };
          }
          return todo;
        })
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      setTodos([
        {
          id,
          content: value,
          isDone: false,
        },
        ...todos,
      ]);
    }
    setValue("");
    id++;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleButtonClick();
    }
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const handleEditClick = (id) => {
    let newTodo = todos.find((e) => e.id === id);
    setIsEditing(true);
    setValue(newTodo.content);
    setEditId(id);
  };

  const displayAll = () => {
    setDisplay("all");
  };

  const displayIsDone = () => {
    setDisplay("isDone");
  };

  const displayUnDone = () => {
    setDisplay("unDone");
  };

  const clearAll = () => {
    setTodos([]);
  };

  return (
    <TodoContainer>
      <Title>Todo List</Title>
      <TodoAdd>
        <input
          type="text"
          placeholder="新增代辦事項"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {isEditing ? (
          <button onClick={handleButtonClick}>更新</button>
        ) : (
          <button onClick={handleButtonClick}>提交</button>
        )}
      </TodoAdd>
      {todos.filter(DISPLAY_MAP[display]).map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleIsDone={handleToggleIsDone}
          handleEditClick={handleEditClick}
        />
      ))}
      <TodoDisplay>
        <DisplayButton onClick={displayAll}>全部</DisplayButton>
        <DisplayButton onClick={displayIsDone}>已完成</DisplayButton>
        <DisplayButton onClick={displayUnDone}>未完成</DisplayButton>
      </TodoDisplay>
      <ClearAllButton onClick={clearAll}>清空全部</ClearAllButton>
    </TodoContainer>
  );
}

export default App;
