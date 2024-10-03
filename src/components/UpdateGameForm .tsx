import GameForm from "./GameFrom"
import useGame from "../hooks/useGame"


interface IProps {
    id: string;
    onSubmit: (id: string, data: any) => Promise<void>;
}
const UpdateGameForm = ({ id, onSubmit }: IProps) => {

    const { data, isLoading, error } = useGame(id)
    const handleSubmit = async (updateData: any) => {
        onSubmit(id, updateData)
    }
    if (isLoading) {
        return <div className="container mx-auto mt-5">Loading...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto mt-5 text-red-500">
                Error loading game
            </div>
        );
    }
    return <div>
        <GameForm onSubmit={handleSubmit}
            initialName={data?.name}
            initialDescription={data?.description}
            initialImage={data?.image}
            initialMetacritic={data?.metacritic}
            initialRatingTop={data?.rating_top}
            updating={true} />
    </div>


}



export default UpdateGameForm