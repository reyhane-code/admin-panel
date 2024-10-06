import Genre from "../entities/Genre";
import useGenre from "../hooks/useGenre";
import GenreFrom from "./GenreForm";


interface IProps {
    genre: Genre;
    onSubmit: ( data: any) => void
}
const UpdateGenreForm = ({ genre, onSubmit }: IProps) => {

    const { data, isLoading, error } = useGenre(genre.id)
    const handleSubmit = async (updateData: any) => {
        onSubmit(updateData)
    }
    if (isLoading) {
        return <div className="container mx-auto mt-5">Loading...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto mt-5 text-red-500">
                Error loading genre
            </div>
        );
    }
    return <div>
        <GenreFrom onSubmit={handleSubmit} initialName={data?.name} />
    </div>


}



export default UpdateGenreForm