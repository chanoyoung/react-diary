import "./App.css";
import React, {
  useReducer,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "SAVE":
      action.data.createDate = new Date().getTime();
      return [action.data, ...state];
    case "EDIT":
      console.log(action.targetId);
      console.log(action.newContent);
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    case "DELETE":
      return state.filter((it) => it.id !== action.targetId);
    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        score: Math.floor(Math.random() * 5) + 1,
        createDate: new Date().getTime(),
        id: dataId.current++,
      };
    });
    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onSave = useCallback(({ author, content, score }) => {
    dispatch({
      type: "SAVE",
      data: { author, content, score, id: dataId.current },
    });

    dataId.current += 1;
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({ type: "DELETE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onSave, onEdit, onDelete };
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.score >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor onSave={onSave} />
          <div>All journals : {data.length}</div>
          <div>Good journals : {goodCount}</div>
          <div>Bad journals : {badCount}</div>
          <div>Good journals ratio : {goodRatio}</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
