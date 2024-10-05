import GameForm from "./GameFrom"
import useGame from "../hooks/useGame"


interface IProps {
    slug: string;
    onSubmit: (slug: string, data: any) => Promise<void>;
}
const UpdateGameForm = ({ slug, onSubmit }: IProps) => {

    const { data, isLoading, error } = useGame(slug)
    const handleSubmit = async (updateData: any) => {
        onSubmit(slug, updateData)
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
            initialName={data?.game.name}
            initialDescription={data?.game.description}
            initialImage={data?.game.image}
            initialMetacritic={data?.game.metacritic}
            initialRatingTop={data?.game.rating_top}
            updating={true} />
    </div>


}



export default UpdateGameForm