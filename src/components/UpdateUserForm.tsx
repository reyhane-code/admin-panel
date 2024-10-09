import User from "../entities/User";
import useUser from "../hooks/useUser";
import UserForm from "./UserForm";


interface IProps {
    user: User;
    onSubmit: (data: any) => void
}
const UpdateUserForm = ({ user, onSubmit }: IProps) => {

    const { data, isLoading, error } = useUser(user.id)
    const handleSubmit = async (updateData: any) => {
        onSubmit(updateData)
    }
    if (isLoading) {
        return <div className="container mx-auto mt-5">Loading...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto mt-5 text-red-500">
                Error loading user
            </div>
        );
    }
    return <div>
        <UserForm onSubmit={handleSubmit}
            initialActiveState={data.active}
            initialFirstName={data.first_name}
            initialLastName={data.last_name}
            initialUsername={data.username}
            initialRole={data.role}
            updating={true} />

    </div>


}



export default UpdateUserForm