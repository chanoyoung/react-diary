import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useState, useRef } from "react";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onSave = ({ author, content, score }) => {
    const createDate = new Date().getTime();
    const newItem = {
      author,
      content,
      score,
      createDate,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  return (
    <div className="App">
      <DiaryEditor onSave={onSave} />
      <DiaryList diaryList={data} />
    </div>
  );
}

export default App;
