import GameForm from "./GameFrom"
import useGame from "../hooks/useGame"
import { Game } from "../entities/Game";


interface IProps {
    game: Game
    onSubmit: (data: any) => Promise<void>;
}
const UpdateGameForm = ({ game, onSubmit }: IProps) => {

    const { data, isLoading, error } = useGame(game.slug)
    const handleSubmit = async (updateData: any) => {
        onSubmit(updateData)
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
    return <div className="w-full">
        <GameForm onSubmit={handleSubmit}
            initialName={data?.game.name}
            initialDescription={data?.game.description}
            initialImage={data?.game.image}
            initialMetacritic={data?.game.metacritic}
            initialRatingTop={data?.game.rating_top}
            updating={true} />
    </div>


}



export default UpdateGameForm