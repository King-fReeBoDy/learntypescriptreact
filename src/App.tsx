import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";

function App() {
  interface IData {
    id: string;
    todo: string;
    completed: boolean;
  }

  const getTodoFromLocalStorage = (): IData[] | [] => {
    const fromStorage = localStorage.getItem("todos");
    if (fromStorage) {
      return JSON.parse(fromStorage);
    }
    return [];
  };

  const [data, setData] = useState<IData[]>(getTodoFromLocalStorage || []);
  const [todo, setTodo] = useState("");

  const formHandler = (event: FormEvent) => {
    event.preventDefault();
    if (!todo) return;
    const createTodo = {
      id: Date.now().toString(),
      todo,
      completed: false,
    };
    setData((prev) => {
      return [...prev, createTodo];
    });
    setTodo("");
    localStorage.setItem("todos", JSON.stringify(data));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTodo = data.map((element) => {
      if (element.id === event.target.id) {
        return { ...element, completed: !element.completed };
      }
      return element;
    });
    setData(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  };

  const handleClearAll = () => {
    setData([]);
    localStorage.removeItem("todos");
  };

  return (
    <>
      <form onSubmit={formHandler}>
        <input
          type="text"
          name="todo"
          placeholder="Input your todos"
          value={todo}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setTodo(event.target.value)
          }
          className="form-input"
        />
        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>

      <div className="container">
        {data.map((element, idx) => {
          return (
            <section
              className={`${idx % 2 !== 0 ? "background" : ""} each-todo`}
              key={element.id}
            >
              <p className={`${element.completed ? "strike" : " "}`}>
                {element.todo}
              </p>
              <input
                type="checkbox"
                id={element.id}
                checked={element.completed}
                onChange={handleChange}
              />
            </section>
          );
        })}
        {data.length !== 0 && (
          <p className="clear-all" onClick={handleClearAll}>
            Clear All
          </p>
        )}
      </div>
    </>
  );
}

export default App;
