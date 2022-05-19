import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList, onDelete, onEdit }) => {
  return (
    <div className="diaryList">
      <h2>Journal</h2>
      <h4>There are {diaryList.length} memories.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
