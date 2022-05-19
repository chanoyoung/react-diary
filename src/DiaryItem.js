import { useState, useRef } from "react";

const DiaryItem = ({
  id,
  author,
  content,
  score,
  createDate,
  onDelete,
  onEdit,
}) => {
  const dayFeeling = ["", "bad", "not bad", "good", "great", "awesome"];
  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    if (window.confirm(`Do you want to delet journal #${id}?`)) {
      onDelete(id);
    }
  };

  const cancelEdit = () => {
    if (window.confirm("Do you want to cancel edit?")) {
      setLocalContent(content);
      setIsEdit(!isEdit);
    }
  };

  const handleEdit = () => {
    if (localContent.length < 1) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm("Do you want to save?")) {
      onEdit(id, localContent);
      setIsEdit(!isEdit);
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          author : {author} | Today was {dayFeeling[score]}.
        </span>
        <br />
        <span className="create-date">
          {new Date(createDate).toLocaleString()}
        </span>
      </div>
      <div className="content">
        {isEdit ? (
          <textarea
            ref={localContentInput}
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
          />
        ) : (
          <span>{content}</span>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={cancelEdit}>cancel</button>
          <button onClick={handleEdit}>save</button>
        </>
      ) : (
        <>
          <button onClick={handleDelete}>delete</button>
          <button onClick={toggleIsEdit}>edit</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
