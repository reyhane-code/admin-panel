import UserContentFeed from "../components/UserContentFeed";

const UserBookmarks = () => {

  return (
    <>
      <div>
        <div role="tablist" className="tabs tabs-bordered">

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Games"
            defaultChecked />
          <div role="tabpanel" className="tab-content p-10"><UserContentFeed contentType="game" requestType="bookmarks" /></div>

          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Articles" />
          <div role="tabpanel" className="tab-content p-10"><UserContentFeed contentType="article" requestType="bookmarks" /></div>
        </div>

      </div>
    </>
  );
};

export default UserBookmarks;
