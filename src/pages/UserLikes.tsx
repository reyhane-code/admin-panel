import UserContentFeed from "../components/UserContentFeed";

const UserLikes = () => {

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
          <div role="tabpanel" className="tab-content p-10"><UserContentFeed contentType="game" requestType="likes" /></div>

          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Articles" />
          <div role="tabpanel" className="tab-content p-10"><UserContentFeed contentType="article" requestType="likes" /></div>
        </div>

      </div>
    </>
  );
};

export default UserLikes;
