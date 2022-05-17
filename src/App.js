import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "I",
    content: "hello world",
    score: "5",
    createDate: new Date().getTime(),
  },
  {
    id: 2,
    author: "You",
    content: "hello world2",
    score: "3",
    createDate: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
