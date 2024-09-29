import ArticlesContainer from "../components/ArticlesContainer";
import SortSelector from "../components/SortSelector";

const ArticlesPage = () => {
  return (
    <>
      <div>
        <SortSelector sortbyOptions={[
          { value: "-createdAt", label: "Date added" },
          { value: "title", label: "Title" },
          { value: "view", label: "Popularity" },
        ]} />
      </div>
      <ArticlesContainer />
    </>
  );
};

export default ArticlesPage;
