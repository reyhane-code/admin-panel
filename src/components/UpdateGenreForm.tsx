import useGenre from "../hooks/useGenre";
import usePlatform from "../hooks/usePlatform";
import GenreFrom from "./GenreForm";


interface IProps {
    id: string;
    onSubmit: (id: string, data: any) => void
}
const UpdateGenreForm = ({ id, onSubmit }: IProps) => {

    const { data, isLoading, error } = useGenre(id)
    const handleSubmit = async (updateData: any) => {
        onSubmit(id, updateData)
    }
    if (isLoading) {
        return <div className="container mx-auto mt-5">Loading...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto mt-5 text-red-500">
                Error loading article
            </div>
        );
    }
    return <div>
        <GenreFrom onSubmit={handleSubmit} initialName={data?.name} />
    </div>


}



export default UpdateGenreForm