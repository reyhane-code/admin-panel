import usePublisher from "../hooks/usePublisher";
import PublisherForm from "./PublisherForm";


interface IProps {
    id: string;
    onSubmit: (id: string, data: any) => void
}
const UpdatePublisherForm = ({ id, onSubmit }: IProps) => {

    const { data, isLoading, error } = usePublisher(id)
    const handleSubmit = async (updateData: any) => {
        onSubmit(id, updateData)
    }
    if (isLoading) {
        return <div className="container mx-auto mt-5">Loading...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto mt-5 text-red-500">
                Error loading puvlisher
            </div>
        );
    }
    return <div>
        <PublisherForm onSubmit={handleSubmit} initialName={data?.name} />
    </div>


}



export default UpdatePublisherForm