import { useState } from "react";
import UserForm from "./UserForm";


interface IProps {
    onSubmit: (data: any) => void
}
const CreateUserForm = ({ onSubmit }: IProps) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        setError(''); // Reset error state before submission
        try {
            onSubmit(data); // Await the onSubmit function
        } catch (err) {
            setError('Failed to create game. Please try again.'); // Set error message if submission fails
        } finally {
            setIsLoading(false); // Ensure loading state is reset
        }
    }
    if (isLoading) {
        return <div className="container mx-auto mt-5">Loading...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto mt-5 text-red-500">
                Error creating user!
            </div>
        );
    }
    return <div>
        <UserForm updating={false} onSubmit={handleSubmit}
        />
    </div>


}



export default CreateUserForm