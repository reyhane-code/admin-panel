import MainMenu from "../components/MainMenu";
import UsersList from "../components/UsersList";

const UsersPage = () => {

    return (
        <div className="flex items-start w-full">
            <div className=" w-1/4 max-width-[25rem] min-width-[16rem]">
                <MainMenu />
            </div>

            <div className="flex flex-col flex-grow-1">
                <UsersList />
            </div>
        </div>

    );
};

export default UsersPage;
