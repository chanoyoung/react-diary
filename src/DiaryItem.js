const DiaryItem = ({ id, author, content, score, createDate }) => {
  const dayFeeling = ["", "bad", "not bad", "good", "great", "awesome"];
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
      <div className="content">{content}</div>
    </div>
  );
};

export default DiaryItem;
