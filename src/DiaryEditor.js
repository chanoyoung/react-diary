import { useState } from "react";

const DiaryEditor = () => {
  const [state, setState] = useState({
    author: "",
    content: "",
    score: 3,
  });

  const handleStageChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(state);
    alert("save completed");
  };

  return (
    <div className="DiaryEditor">
      <h2>Day.log</h2>
      <div>
        <input
          name="author"
          value={state.author}
          onChange={handleStageChange}
        />
      </div>
      <div>
        <textArea
          name="content"
          value={state.content}
          onChange={handleStageChange}
        />
      </div>
      <div>
        <span>today.was.</span>
        <select name="score" value={state.emotion} onChange={handleStageChange}>
          <option value={1}>bad</option>
          <option value={2}>not bad</option>
          <option value={3} selected>
            good
          </option>
          <option value={4}>great</option>
          <option value={5}>awesome</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

export default DiaryEditor;
