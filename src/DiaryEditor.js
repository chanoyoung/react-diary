import React, { useState, useRef } from "react";

const DiaryEditor = ({ onSave }) => {
  const AUTHOR_MIN = 1;
  const CONTENT_MIN = 1;
  const authorInput = useRef();
  const contentInput = useRef();

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
    if (state.author.length < AUTHOR_MIN) {
      authorInput.current.focus();
      return;
    }

    if (state.content.length < CONTENT_MIN) {
      contentInput.current.focus();
      return;
    }

    onSave(state);
    alert("save completed");
    setState({
      author: "",
      content: "",
      score: 3,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>Day.log</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleStageChange}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleStageChange}
        />
      </div>
      <div>
        <span>today.was.</span>
        <select name="score" value={state.score} onChange={handleStageChange}>
          <option value={1}>bad</option>
          <option value={2}>not bad</option>
          <option value={3}>good</option>
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

export default React.memo(DiaryEditor);
