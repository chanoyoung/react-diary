import "./App.css";
import { useState, useRef, useCallback } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onSave = useCallback(({ author, content, score }) => {
    const createDate = new Date().getTime();
    const newItem = {
      author,
      content,
      score,
      createDate,
      id: dataId.current,
    };
    dataId.current += 1;
    setData((data) => [newItem, ...data]);
  }, []);

  const onDelete = useCallback((targetId) => {
    setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    setData((data) =>
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  }, []);

  return (
    <div className="App">
      <DiaryEditor onSave={onSave} />
      <DiaryList diaryList={data} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

export default App;
