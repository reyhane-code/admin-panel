import { HttpRequest } from "../helpers/http-request-class.helper"
import GameForm from "./GameFrom"
import useGame from "../hooks/useGame"


interface IProps {
    id: string
}
const UpdateGameForm = ({ id }: IProps) => {

    const { data, isLoading, error } = useGame(id)
    const onSubmit = async (updataData: any) => {
        const res = await HttpRequest.put(`/v1/games/${id}`, updataData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!res) {
            throw new Error('can not update!')
        }
        if (res.status == 200) {
            return res.data
        }

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
        <GameForm onSubmit={onSubmit}
            initialName={data?.name}
            initialDescription={data?.description}
            initialImage={data?.image}
            initialMetacritic={data?.metacritic}
            initialRatingTop={data?.rating_top} />
    </div>


}



export default UpdateGameForm