import Publisher from "../entities/Publisher";
import usePublisher from "../hooks/usePublisher";
import PublisherForm from "./PublisherForm";


interface IProps {
    publisher: Publisher
    onSubmit: (data: any) => void
}
const UpdatePublisherForm = ({ publisher, onSubmit }: IProps) => {

    const { data, isLoading, error } = usePublisher(publisher.id)
    const handleSubmit = async (updateData: any) => {
        onSubmit(updateData)
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