import { useState } from "react";
import GameForm from "./GameFrom";

interface IProps {
    onSubmit: (data: any) => void // Ensure onSubmit returns a Promise
}

const CreateGameForm = ({ onSubmit }: IProps) => {
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
    };

    if (isLoading) {
        return <div className="container mx-auto mt-5">Loading...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto mt-5 text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div>
            <GameForm onSubmit={handleSubmit} updating={false} />
        </div>
    );
};

export default CreateGameForm;
