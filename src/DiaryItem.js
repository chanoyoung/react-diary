const DiaryItem = ({ id, author, content, score, createDate }) => {
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          author : {author} | Today was {score}.
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
